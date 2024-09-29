import useComponentVisible from "./Hooks/useComponentVisible";
import { usePage, Link, router } from "@inertiajs/react"
import Notifications from "./notifications";
import { useState } from "react";
import Echo from 'laravel-echo'
export default function UserMenu() {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { auth } = usePage().props
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState(auth.notifications)
    window.Echo.private('App.Models.User.' + auth.user.id)
        .notification((notification) => {
            notification['data'] = { message: notification.message, title: notification.title }
            setNotifications([notification, ...notifications])
        });

    return (
        <>
            {auth.user && showNotifications && <Notifications close={() => { setShowNotifications(false); router.reload({ onSuccess: () => { setNotifications(auth.notifications) } }) }} notifications={notifications} />}
            {auth.user &&
                <div className="flex justify-end max-md:justify-center">
                    <div ref={ref}>
                        <button className="w-10 h-10 mt-2 max-md:w-20 max-md:h-20" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                            <img className="w-full h-full rounded-full border border-black" src={auth.user.user_img} alt="user image" />
                        </button>

                        {isComponentVisible && (
                            <div className="absolute z-10 right-0 max-md:right-1/3">
                                <div className="border border-slate-400 shadow-2xl bg-white rounded-md  text-slate-400">
                                    <ul className="text-slate-600 font-md font-semibold">
                                        <Link preserveState preserveScroll href={route('user.show', auth.user)}>
                                            <li className="block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                                Profile
                                            </li>
                                        </Link>
                                        <button onClick={() => { setShowNotifications(true) }}>
                                            <li className="relative block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                                Notifications
                                                {notifications.length > 0 &&
                                                    <div className="absolute top-1.5 shadow-md right-1 text-xs z-10 bg-slate-700 text-slate-100 px-1.5 rounded-full ">
                                                        {notifications.length}
                                                    </div>

                                                }
                                            </li>
                                        </button>
                                        <Link method="post" href='/logout'>
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