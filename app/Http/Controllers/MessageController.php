<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Notifications\DeleteConversationNotification;
use App\Notifications\MessageNotification;
use Illuminate\Http\Request;
use Illuminate\Contracts\Database\Eloquent\Builder;

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


    public function deleteConversation($message)
    {
        $message = Message::withTrashed()->find($message); # becuase of soft deletes
        $recipient_id = $message->reciever_id == auth()->user()->id ? $message->sender_id : $message->reciever_id;
        Message::withTrashed()->where("sender_id", auth()->user()->id)->where("reciever_id", $recipient_id)
            ->where("created_at", "<=", $message->created_at)->update(["deleted_for_sender" => true]);
        Message::withTrashed()->where("sender_id", $recipient_id)->where("reciever_id", auth()->user()->id)
            ->where("created_at", "<=", $message->created_at)->update(["deleted_for_reciever" => true, "is_seen" => true]);
        auth()->user()->notify(new DeleteConversationNotification($message->toArray()));
    }

    public function markAsSeen($message)
    {
        $message = Message::withTrashed()->find($message); # because of soft delete
        Message::withTrashed()->where("sender_id", $message->sender_id)->where("reciever_id", auth()->user()->id)
            ->where("created_at", "<=", $message->created_at)
            ->update(["is_seen" => true]);
        $message->refresh();
        User::find($message->reciever_id)->notify(new MessageNotification($message->toArray()));
        User::find($message->sender_id)->notify(new MessageNotification($message->toArray()));
        return $message;
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
            })->groupByRaw("col1,col2")->with("sender", "reciever")->latest()->paginate(10, pageName: "chatPage");
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
        $message->refresh();
        $message->load("sender");
        $messageForSender = $message->toArray();
        $messageForSender['sender'] = $message->reciever()->first();
        $message->reciever->notify(new MessageNotification($message->toArray(), true));
        $message->sender->notify(new MessageNotification($messageForSender, true));
        return $messageForSender;
    }

    /**
     * Display the specified resource.
     */
    public function show($recipient_id)
    {
        $messages = $this->getConversation($recipient_id)->latest()->with("sender")
            ->cursorPaginate(5, cursorName: "messagePage");
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
        return $message;
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
        return $message;
    }

    public function search(string $query = "")
    {
        $users = User::search($query)->query(fn(Builder $query) => $query->with(
            [
                'recievedMessages' => function (Builder $query) {
                    $query->where('sender_id', auth()->user()->id)->latest();

                },
                'sentMessages' => function (Builder $query) {
                    $query->where('reciever_id', auth()->user()->id)->latest();
                }
            ]
        ))->paginate(10, pageName: "chatPage");
        $users->getCollection()->transform(function (User $user) {
            $user = $user->toArray();
            $message = ["is_seen" => true, "message" => "", "created_at" => null];
            $latestMessage = collect([head($user["sent_messages"]) == false ? null : head($user["sent_messages"]), head($user["recieved_messages"]) == false ? null : head($user["recieved_messages"])]);
            $latestMessage = $latestMessage->where("created_at", $latestMessage->max("created_at"))->first();
            if ($latestMessage != null) {
                $message = $latestMessage;
            }
            $user["recieved_messages"] = null;
            $user["sent_messages"] = null;
            $newUser = collect($message)->merge(["sender" => $user]);
            return $newUser;
        });
        return $users;


    }

}
