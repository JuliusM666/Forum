<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return auth()->user()->Chats()->paginate(10, pageName: "chat_page");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($recipient_id)
    {
        return Message::where("sender_id", auth()->user()->id)->where("reciever_id", $recipient_id)->
            orWhere(function (Builder $query) use ($recipient_id) {
                $query->where("sender_id", $recipient_id)
                    ->where("reciever_id", auth()->user()->id);
            })->with("sender")->latest()->cursorPaginate(5, cursorName: "message_page");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
