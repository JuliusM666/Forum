<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Notifications\DeleteMessagesNotification;
use App\Notifications\MessageNotification;
use App\Notifications\SeenMessageNotification;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class MessageController extends Controller
{


    private function getConversation($recipient_id)
    {
        return Message::withTrashed()->where(function (Builder $query) use ($recipient_id) {
            $query->where("sender_id", auth()->user()->id)->where("reciever_id", $recipient_id)->
                where("deleted_for_sender", false)->
                orWhere(function (Builder $query) use ($recipient_id) {
                    $query->where("sender_id", $recipient_id)
                        ->where("reciever_id", auth()->user()->id)->where("deleted_for_reciever", false);
                });
        });
    }


    public function deleteConversation($recipient_id)
    {
        $this->getConversation($recipient_id)->where("sender_id", auth()->user()->id)->update(["deleted_for_sender" => true]);
        $this->getConversation($recipient_id)->where("reciever_id", auth()->user()->id)->update(["deleted_for_reciever" => true]);
        auth()->user()->notify(new DeleteMessagesNotification($recipient_id));
    }

    public function markAsSeen(Message $message)
    {
        Message::withTrashed()->where("sender_id", $message->sender_id)->where("reciever_id", auth()->user()->id)
            ->where("created_at", "<=", $message->created_at)
            ->update(["is_seen" => true]);
        auth()->user()->notify(new SeenMessageNotification($message->id));
        User::find($message->sender_id)->notify(new SeenMessageNotification($message->id));
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::withTrashed()->selectRaw("min(reciever_id,sender_id) as col1, max(reciever_id,sender_id) as col2 , *")
            ->fromRaw("(SELECT * FROM messages ORDER BY created_at DESC) messages")
            ->where(function (Builder $query) {
                $query->where("sender_id", auth()->user()->id)->
                    where("deleted_for_sender", false)->
                    orWhere(function (Builder $query) {
                        $query->where("reciever_id", auth()->user()->id)->where("deleted_for_reciever", false);
                    });
            })->groupByRaw("col1,col2")->with("sender", "reciever")->latest()->paginate(10, pageName: "chat_page");
        $messages->getCollection()->transform(function (Message $message) {
            $newMessage = $message->toArray();
            if ($message->trashed()) {
                $newMessage['message'] = "deleted by user";
            }
            if ($message->sender_id == auth()->user()->id) {
                $newMessage['sender'] = $message['reciever'];
            }
            return $newMessage;
        });
        return $messages;
    }

    public function getNotSeenCount()
    {
        return Message::where("reciever_id", auth()->user()->id)->where("is_seen", false)->count();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'reciever_id' => 'required|integer',
            'message' => 'required|min:1|max:200',
        ]);

        $message = Message::create([
            'message' => $request->message,
            'sender_id' => auth()->user()->id,
            'reciever_id' => $request->reciever_id,
        ]);
        $message->load("sender");
        $messageForReciever = $message->toArray();
        $messageForReciever['sender'] = $message->reciever()->first();
        $message->reciever->notify(new MessageNotification($message->toArray(), true));
        $message->sender->notify(new MessageNotification($messageForReciever, true));
    }

    /**
     * Display the specified resource.
     */
    public function show($recipient_id)
    {
        $messages = $this->getConversation($recipient_id)->latest()->with("sender")
            ->cursorPaginate(5, cursorName: "message_page");
        $messages->getCollection()->transform(function ($message) {
            if ($message->trashed()) {
                $message->message = "deleted by user";
            }
            return $message;
        });
        return [
            "recipient" => User::find($recipient_id),
            "messages" => $messages
        ];

    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        $this->authorize('update', $message);
        $request->validate([
            'message' => 'required|min:1|max:200',
        ]);
        $message->message = $request->message;
        $message->is_edited = true;
        $message->save();
        $message->reciever->notify(new MessageNotification($message->toArray()));
        $message->sender->notify(new MessageNotification($message->toArray()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $this->authorize('delete', $message);
        $message->delete();
        $message->message = "deleted by user";
        $message->reciever->notify(new MessageNotification($message->toArray()));
        $message->sender->notify(new MessageNotification($message->toArray()));
    }

}
