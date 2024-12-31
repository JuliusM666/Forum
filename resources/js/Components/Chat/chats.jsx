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
        let messageId = null
        let isLater = false
        for (let i = 0; i < chatsRef.current.length; i++) {
            if ((chatsRef.current[i].reciever_id == message.reciever_id && chatsRef.current[i].sender_id == message.sender_id) || (chatsRef.current[i].sender_id == message.reciever_id && chatsRef.current[i].reciever_id == message.sender_id)) {
                messageId = i
                if (chatsRef.current[i].created_at <= message.created_at) {
                    isLater = true
                    message = { ...message, sender: chatsRef.current[i].sender }

                }
                break
            }
        }
        if (messageId == null && message.is_edited == false && message.deleted_at == null && message.is_seen == false) {
            setChats([message, ...chatsRef.current])
        }
        else if (messageId != null && isLater == true) {
            const newChats = [...chatsRef.current]
            if (message.is_edited == false && message.deleted_at == null && message.is_seen == false) {
                newChats.splice(messageId, 1)
                newChats.unshift(message)
            }
            else {
                newChats[messageId] = message
            }
            setChats(newChats)
        }



    }
    function updateMessages(message) {
        if ((activeChatRef.current == message.reciever_id && auth.user.id == message.sender_id) || (activeChatRef.current == message.sender_id && auth.user.id == message.reciever_id)) {
            let messageId = null
            for (let i = 0; i < messagesRef.current.length; i++) {
                if (messagesRef.current[i].id == message.id) {
                    message = { ...message, sender: messagesRef.current[i].sender }
                    messageId = i
                    break
                }
            }
            if (messageId == null && message.is_edited == false && message.deleted_at == null && message.is_seen == false) {
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
        updateChats(message)
        updateMessages(message)
        router.reload({ only: ['chatsNotSeen'] })  // for instant feedback*/ 
    }
    function deleteConversation(message) {
        setChats((chats) => chats.filter(chat => chat.id !== message.id))
    }
    useEffect(() => {
        if (auth.user) {
            window.Echo.private('App.Models.User.' + auth.user.id)
                .notification((notification) => {
                    if (notification.correct_id != null) {
                        notification.id = notification.correct_id
                    }
                    if (notification.type == "message") {
                        update(notification)
                    }
                    else if (notification.type == "deleteConversation") {
                        deleteConversation(notification)
                    }
                })
            return () => {
                window.Echo.leave('App.Models.User.' + auth.user.id)
            }
        }
    }, [])
    useEffect(() => { setMessages([]) }, [activeChat])
    return (
        <>
            {showChats &&
                <div className="fixed z-20 text-slate-700 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-full">
                    <Card name="Chats" ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                        <div className="bg-slate-100 h-1/2">
                            {activeChat == null && <Chat nextPageUrl={nextPageUrl} chats={chats} setChats={setChats} setActiveChat={setActiveChat} />}
                            {activeChat != null && <Messages key={activeChat} deleteConversation={deleteConversation} update={update} messages={messages} setMessages={setMessages} activeChat={activeChat} setActiveChat={setActiveChat} />}
                        </div>
                    </Card>
                </div>
            }

        </>
    )

}