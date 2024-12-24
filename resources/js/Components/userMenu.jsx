import useComponentVisible from "./Hooks/useComponentVisible"
import { usePage, Link, router } from "@inertiajs/react"
import Notifications from "./notifications"
import Chats from "./Chat/chats"
import { useState, useEffect, useContext, useRef } from "react"
import { ModalContext } from "./Context/modalContext"
export default function UserMenu() {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { notifications, auth, chatsNotSeen } = usePage().props
    const [chats, setChats] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)
    const nextPageUrl = useRef(route("chats.index"))
    const { showChats, setShowChats, setActiveChat } = useContext(ModalContext)

    function updateChats(notification) {
        let messageExists = false
        router.reload({ only: ['chatsNotSeen'] })
        for (let i = 0; i < chats.length; i++) {
            if ((chats[i].reciever_id == notification.reciever_id && chats[i].sender_id == notification.sender_id) || (chats[i].sender_id == notification.reciever_id && chats[i].reciever_id == notification.sender_id)) {
                messageExists = true
                if (chats[i].created_at <= notification.created_at) {
                    notification.sender = chats[i].sender
                    const newChats = [...chats]
                    if (notification.is_edited == false && notification.deleted_at == null) {
                        newChats.splice(i, 1)
                        newChats.unshift(notification)
                    }
                    else {
                        newChats[i] = notification
                    }
                    setChats(newChats)
                }
                break
            }
        }
        if (messageExists == false && notification.is_edited == false && notification.deleted_at == null) {
            setChats((chats) => [notification, ...chats])
        }
    }
    useEffect(() => {
        if (auth.user) {
            window.Echo.private('App.Models.User.' + auth.user.id)
                .notification((notification) => {
                    console.log(notification)
                    if (notification.type == "message") {
                        updateChats(notification)
                    }
                    else if (notification.type == "deleteMessages") {
                        setChats(chats.filter(chat => chat.sender.id !== notification.recipient_id))
                    }
                    else if (notification.type == "seenMessages") {
                        setChats(chats.map((chat) => {
                            if (chat.id == notification.messageId) {
                                chat.is_seen = true
                                return chat
                            }
                            return chat
                        }))
                    }
                    else {
                        router.reload({ only: ['notifications'] })
                    }
                })
            return () => {
                window.Echo.leave('App.Models.User.' + auth.user.id)
            }
        }
    }, [chats])
    useEffect(() => {
        if (showChats) {
            setShowNotifications(false)
        }
    }, [showChats])
    return (
        <>
            {auth.user && showNotifications && <Notifications close={() => setShowNotifications(false)} />}
            {auth.user && showChats && <Chats nextPageUrl={nextPageUrl} chats={chats} setChats={setChats} close={() => { setShowChats(false) }} />}
            {auth.user &&
                <div className="flex justify-end max-md:justify-center">
                    <div ref={ref} className="relative">
                        <button className="w-10 h-10 mt-2 max-md:w-20 max-md:h-20" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                            <img className="w-full h-full rounded-full border border-black" src={auth.user.user_img} alt="user image" />
                        </button>

                        {isComponentVisible && (
                            <div className="absolute z-10 -left-10 max-md:-left-6">
                                <div className="w-0 h-0 mx-auto
                                    border-l-[5px] border-l-transparent
                                    border-b-[5px] border-b-white
                                    border-r-[5px] border-r-transparent">
                                </div>
                                <div className="shadow-2xl bg-white rounded-md  text-slate-400">
                                    <ul className="text-slate-600 grid font-md font-semibold">
                                        <Link preserveState preserveScroll href={route('user.show', auth.user)}>
                                            <li className="block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500 text-center">
                                                Profile
                                            </li>
                                        </Link>
                                        <button onClick={() => { setShowNotifications(true), setShowChats(false) }}>
                                            <li className="relative block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                                Notifications
                                                {notifications.length > 0 &&
                                                    <div className="animate-bounce absolute text-center align-middle top-1.5 shadow-md right-1 text-xs z-10 bg-slate-700 text-slate-100 px-1 rounded-full ">
                                                        {notifications.length}
                                                    </div>

                                                }
                                            </li>
                                        </button>
                                        <button onClick={() => { setShowChats(true), setShowNotifications(false) }}>
                                            <li className="relative block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                                Chats
                                                {chatsNotSeen > 0 &&
                                                    <div className="animate-bounce absolute text-center align-middle top-1.5 shadow-md right-1 text-xs z-10 bg-slate-700 text-slate-100 px-1 rounded-full ">
                                                        {chatsNotSeen}
                                                    </div>

                                                }
                                            </li>
                                        </button>
                                        <Link onClick={() => setActiveChat(null)} as="button" method="post" href='/logout'>
                                            <li className="text-right block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                                <i className="fa-solid fa-right-from-bracket" /> </li>
                                        </Link>



                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div >
            }
        </>
    )
}