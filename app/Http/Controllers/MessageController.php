<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
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
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Message::withTrashed()->where("sender_id", auth()->user()->id)->orWhere("reciever_id", auth()->user()->id)->latest()->get()
            ->groupBy(function (Message $message) {
                if ($message->sender_id == auth()->user()->id) {
                    return $message->sender_id . "*" . $message->reciever_id;
                } else {
                    return $message->reciever_id . "*" . $message->sender_id;
                }
            })->map(function ($message) {
                $first_message = $message->first();
                if ($first_message->sender_id == auth()->user()->id) {
                    $first_message->load('reciever');
                    $first_message['sender'] = $first_message['reciever'];
                    unset($first_message['reciever']);
                    if ($first_message->trashed()) {
                        $first_message->message = "deleted by user";
                    }
                    return $first_message;
                } else {
                    return $first_message->load('sender');
                }
            })->sortByDesc('created_at')->values()->paginate(10, pageName: "chat_page");
        $count = Message::where("reciever_id", auth()->user()->id)->where("is_seen", false)->count();
        return ['paginator' => $data, 'not_seen' => $count];
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

        Message::create([
            'message' => $request->message,
            'sender_id' => auth()->user()->id,
            'reciever_id' => $request->reciever_id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($recipient_id)
    {
        $this->getConversation($recipient_id)->update(["is_seen" => true]);
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $this->authorize('delete', $message);
        $message->delete();
    }

}
