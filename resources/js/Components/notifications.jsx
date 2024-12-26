import { useState, useEffect } from "react"
import Card from "./card"
import CloseButton from "./closeButton"
import { usePage } from "@inertiajs/react"
import moment from "moment"
export default function Notifications({ close, showNotifications, setNotifications, notifications }) {
    const [isShowID, setIsShowID] = useState()
    const { auth } = usePage().props
    function markAllAsRead() {
        axios.delete(route('notification.destroyAll')).then((response) => setNotifications([])).catch((error) => console.log(error))
    }
    useEffect(() => {
        if (auth.user) {
            window.Echo.private('App.Models.User.' + auth.user.id)
                .notification((notification) => {
                    if (notification.type == "notification") {
                        setNotifications(notifications => [notification, ...notifications])
                    }
                })
            return () => {
                window.Echo.leave('App.Models.User.' + auth.user.id)
            }
        }
    }, [])
    return (
        <>
            {
                showNotifications && <div className="fixed z-20 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-11/12">
                    <Card name="Notifications" ButtonComponent={<CloseButton handleOnClick={() => { close() }} />}>
                        <div className="bg-slate-100 p-2">


                            <div className="flex justify-end p-2">
                                <button onClick={() => markAllAsRead()} className="text-slate-400 cursor-pointer font-semibold rounded-xl px-2 py-1  text-center hover:bg-slate-400 hover:text-slate-100">mark all as read</button>
                            </div>

                            <ul className="overflow-y-scroll max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                                {notifications.map((notification, index) => {
                                    return (<Notification notification={notification} index={index} key={index} isShowID={isShowID} setIsShowID={setIsShowID} />)
                                })}
                                {notifications.length == 0 && <h1 className="text-right p-2">no notifications</h1>}
                            </ul>
                        </div>
                    </Card>
                </div>
            }
        </>
    )
}



function Notification({ notification, isShowID, setIsShowID, index }) {
    function showNotification() {
        if (isShowID != index) {
            if (notification.deleted != true) {
                axios.delete(route('notification.destroy', [notification.id]))
                    .then(function (response) {
                        notification.deleted = true
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            setIsShowID(index)
        }
        else {
            setIsShowID(null)
        }
    }
    return (
        <li className="text-slate-700">
            <div className={`flex justify-between border-slate-400  border-t  p-2 ${isShowID == index ? 'bg-blue-300' : ''}`}>
                <h1>{moment(notification.created_at).fromNow()}</h1>
                <div className="flex gap-4 items-baseline">
                    <h1 className="font-semibold">
                        {notification.data.data.title}
                    </h1>
                    <button className="hover:opacity-70" onClick={() => showNotification()}>
                        {isShowID != index && <i className="fa-solid fa-caret-down" />}
                        {isShowID == index && <i className="fa-solid fa-caret-up" />}
                    </button>
                </div>
            </div>
            {
                isShowID == index &&
                <div className="border-slate-400  border-t  p-2">
                    {notification.data.data.message}
                </div>
            }
        </li >
    )
}