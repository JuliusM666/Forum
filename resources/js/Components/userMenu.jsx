import useComponentVisible from "./Hooks/useComponentVisible"
import { usePage, Link, router } from "@inertiajs/react"
import Notifications from "./notifications"
import Chats from "./chats"
import { useState, useEffect, useContext } from "react"
import { ModalContext } from "./Context/modalContext"
export default function UserMenu() {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { auth } = usePage().props
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState(auth.notifications)
    const { showChats, setShowChats } = useContext(ModalContext)
    if (auth.user) {
        window.Echo.private('App.Models.User.' + auth.user.id)
            .notification((notification) => {
                router.reload({ only: ['auth'] })
                notification['data'] = { message: notification.message, title: notification.title }
                setNotifications([notification, ...notifications])

            });
    }
    useEffect(() => {
        if (showChats) {
            setShowNotifications(false)
        }
    }, [showChats])
    useEffect(() => { setNotifications(auth.notifications) }, [isComponentVisible])
    return (
        <>
            {auth.user && showNotifications && <Notifications close={() => { setShowNotifications(false); router.reload({ only: ['auth'] }) }} notifications={notifications} />}
            {auth.user && showChats && <Chats close={() => { setShowChats(false) }} />}
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
                                        <button onClick={() => { setShowChats(true) }}>
                                            <li className="relative block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                                Chats
                                                {auth.chats.total > 0 &&
                                                    <div className="animate-bounce absolute text-center align-middle top-1.5 shadow-md right-1 text-xs z-10 bg-slate-700 text-slate-100 px-1 rounded-full ">
                                                        {auth.chats.total}
                                                    </div>

                                                }
                                            </li>
                                        </button>
                                        <Link as="button" method="post" href='/logout'>
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