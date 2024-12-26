import { useContext, useState, useRef, useEffect } from "react"
import { usePage, router } from "@inertiajs/react"
import { ModalContext } from "../Context/modalContext"
import CloseButton from "../closeButton"
import Card from "../card"
import Chat from "./chat"
import Messages from "./messages"

export default function Chats({ close, showChats }) {
    const { activeChat, setActiveChat } = useContext(ModalContext) // recipient id
    const { auth } = usePage().props
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const chatsRef = useRef(chats)
    const messagesRef = useRef(messages)
    const activeChatRef = useRef(activeChat)
    const nextPageUrl = useRef(route("chats.index"))
    useEffect(() => { messagesRef.current = messages }, [messages])
    useEffect(() => { chatsRef.current = chats }, [chats])
    useEffect(() => { activeChatRef.current = activeChat }, [activeChat])
    function updateChats(message) {
        if (chatsRef.current.length == 0 && nextPageUrl.current != null) {
            return
        }
        let messageExists = false
        for (let i = 0; i < chatsRef.current.length; i++) {
            if ((chatsRef.current[i].reciever_id == message.reciever_id && chatsRef.current[i].sender_id == message.sender_id) || (chatsRef.current[i].sender_id == message.reciever_id && chatsRef.current[i].reciever_id == message.sender_id)) {
                messageExists = true
                if (chatsRef.current[i].created_at <= message.created_at) {
                    message.sender = chatsRef.current[i].sender
                    const newChats = [...chatsRef.current]
                    if (message.is_edited == false && message.deleted_at == null) {
                        newChats.splice(i, 1)
                        newChats.unshift(message)
                    }
                    else {
                        newChats[i] = message
                    }
                    setChats(newChats)
                }
                break
            }
        }
        if (messageExists == false && message.is_edited == false && message.deleted_at == null) {
            setChats([message, ...chatsRef.current])
        }

    }
    function updateMessages(message) {
        if ((activeChatRef.current == message.reciever_id && auth.user.id == message.sender_id) || (activeChatRef.current == message.sender_id && auth.user.id == message.reciever_id)) {
            let messageId = null
            for (let i = 0; i < messagesRef.current.length; i++) {
                if (messagesRef.current[i].id == message.id) {
                    message.sender = messagesRef.current[i].sender
                    messageId = i
                    break
                }

            }

            if (messageId == null && message.is_edited == false && message.deleted_at == null) {
                setMessages([message, ...messagesRef.current])
            }
            else if (messageId != null) {
                const newMessages = [...messagesRef.current]
                newMessages[messageId] = message
                setMessages(newMessages)
            }
        }
    }
    function update(message) {
        if (message.correct_id != null) {
            message.id = message.correct_id
        }
        updateChats(message)
        updateMessages(message)
    }
    function deleteConversation(recipient_id) {
        setChats((chats) => chats.filter(chat => chat.sender.id !== recipient_id))
    }
    useEffect(() => {
        if (auth.user) {
            window.Echo.private('App.Models.User.' + auth.user.id)
                .notification((notification) => {
                    router.reload({ only: ['chatsNotSeen'] })
                    console.log(notification)
                    if (notification.type == "message") {
                        update(notification)
                    }
                    else if (notification.type == "deleteConversation") {
                        deleteConversation(notification.recipient_id)
                    }
                })
            return () => {
                window.Echo.leave('App.Models.User.' + auth.user.id)
            }
        }
    }, [])
    return (
        <>
            {showChats &&
                <div className="fixed z-20 text-slate-700 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-11/12">
                    <Card name="Chats" ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                        <div className="bg-slate-100">
                            {activeChat == null && <Chat nextPageUrl={nextPageUrl} chats={chats} setChats={setChats} setActiveChat={setActiveChat} />}
                            {activeChat != null && <Messages deleteConversation={deleteConversation} messagesRef={messagesRef} update={update} messages={messages} setMessages={setMessages} activeChat={activeChat} setActiveChat={setActiveChat} />}
                        </div>
                    </Card>
                </div>
            }

        </>
    )

}