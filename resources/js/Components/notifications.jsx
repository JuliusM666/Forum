import { useState, useEffect, useRef } from "react"
import Card from "./card"
import CloseButton from "./closeButton"
import { usePage, Link } from "@inertiajs/react"
import formatDate from "@/utils/formatDate"
import useModalVisible from "./Hooks/useModalVisible"
import UserPicture from "./userPicture"
export default function Notifications({ close, showNotifications, setNotifications, notifications }) {
    const [showID, setShowID] = useState()
    const processing = useRef(false)
    const { auth } = usePage().props
    function markAllAsRead() {
        processing.current = true
        axios.delete(route('notification.destroyAll')).then((response) => setNotifications([])).catch((error) => console.log(error)).finally(() => processing.current = false)
    }
    function markAsDeleted(id) {
        setNotifications(notifications.map(notification => {
            if (notification.id == id) {
                notification.deleted = true
                return notification
            }
            return notification
        }))
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
                showNotifications && <div className="fixed z-20 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-full">
                    <Card name="Notifications" ButtonComponent={<CloseButton handleOnClick={() => { close() }} />}>
                        <div className="bg-slate-100">


                            <div className="flex justify-end border-b border-slate-300 p-2">
                                <button disabled={processing.current} onClick={() => markAllAsRead()} className="text-slate-600 text-md font-semibold rounded-xl px-2 py-1  text-center hover:bg-slate-400 hover:text-slate-100">mark all as read</button>
                            </div>

                            <ul className="overflow-y-scroll min-h-[30vh] max-h-[40vh] scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                                {notifications.map((notification, index) => {
                                    return (<Notification markAsDeleted={() => markAsDeleted(notification.id)} processing={processing} notification={notification} index={index} key={index} showID={showID} setShowID={setShowID} />)
                                })}
                                {notifications.length == 0 && <li className="grid grid-cols-1 text-center p-6 gap-4">
                                    <i className="fa-regular fa-bell text-9xl text-blue-300" />
                                    <h1 className="font-semibold text-slate-700">No notifications, yet.</h1>
                                </li>}
                            </ul>
                        </div>
                    </Card>
                </div>
            }
        </>
    )
}



function Notification({ notification, markAsDeleted, showID, setShowID, index, processing }) {
    const [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false);
    function deleteNotification() {
        if (notification.deleted != true) {
            processing.current = true
            axios.delete(route('notification.destroy', [notification.id]))
                .then(function (response) {
                    markAsDeleted()
                })
                .catch(function (error) {
                    console.log(error)
                }).finally(function () {
                    processing.current = false

                });
        }
    }
    function showNotification() {
        if (showID != index) {

            setShowID(index)
        }
        else {
            setShowID(null)
        }

    }
    return (
        <li className="text-slate-600 text-sm p-4 relative border-b hover:bg-slate-200 border-slate-300 grid grid-cols-1 gap-2">
            <div className="flex justify-between">
                <div className="flex gap-3 items-baseline grow">
                    {notification.deleted == null &&
                        <div className="bg-blue-300 shrink-0 size-2 rounded-full"></div>
                    }
                    {notification.deleted == true &&
                        <div className=" size-2"></div>
                    }

                    <div className="grid grid-cols-1 w-full">
                        <div className="flex gap-1">
                            <h1 className="font-semibold text-nowrap truncate w-2/4 capitalize">
                                {notification.data.title}
                            </h1>
                            {notification.data.type == "theme_subscription" &&
                                <>
                                    <Link className="hover:opacity-70 truncate max-w-[25%]" href={route("theme", [notification.data.theme.topic_id, notification.data.theme.id])}>{notification.data.theme.title}</Link>
                                    <h1>-</h1>
                                    <Link className="hover:opacity-70  truncate max-w-[25%]" href={route("user.show", notification.data.user.id)}>{notification.data.user.name}</Link>
                                </>
                            }
                            {notification.data.type == "post_subscription" &&
                                <>
                                    <Link className="hover:opacity-70 truncate max-w-[25%] " href={route("post", [notification.data.post.topic_id, notification.data.post.theme_id, notification.data.post.id])}>{notification.data.post.title}</Link>
                                    <h1>-</h1>
                                    <Link className="hover:opacity-70 truncate max-w-[25%]" href={route("user.show", notification.data.user.id)}>{notification.data.user.name}</Link>
                                </>
                            }
                        </div>
                        <div>
                            {formatDate(notification.data.created_at)}
                        </div>
                    </div>
                </div>
                <div className="grid items-center" ref={ref}>
                    <button className="hover:opacity-70 hover:bg-slate-300 rounded-full px-2 py-1" onClick={() => { setIsComponentVisible(!isComponentVisible) }}>
                        <i className="fa-solid fa-ellipsis font-semibold text-md" />
                    </button>
                    {isComponentVisible && <div className="z-10 text-md  absolute  right-0 top-14 shadow-xl grid">
                        <div className="w-0 h-0 place-self-end mr-6
                                    border-l-[5px] border-l-transparent
                                    border-b-[5px] border-b-white
                                    border-r-[5px] border-r-transparent">
                        </div>
                        <div className="bg-slate-100 p-1  grid grid-cols-1 rounded-md">
                            <button className="hover:bg-slate-200 rounded-md py-1 px-4" onClick={() => { deleteNotification(), showNotification(), setIsComponentVisible(false) }}>Open</button>
                            <button className="hover:bg-slate-200 rounded-md py-1 px-4" disabled={processing.current} onClick={() => { deleteNotification(), setIsComponentVisible(false) }} >Delete</button>
                        </div>
                    </div>}

                </div>
            </div>
            {
                showID == index &&
                <div className="flex gap-2 border-t pt-2 border-slate-200 items-start">
                    <div className="size-8">
                        <UserPicture user_id={notification.data.user.id} user_img={notification.data.user.user_img} />
                    </div>

                    <h1 className="text-balance place-self-center max-w-[80%] truncate">
                        {notification.data.type == "theme_subscription" &&
                            <> User {notification.data.user.name} has posted in theme {notification.data.theme.title} </>
                        }
                        {notification.data.type == "post_subscription" &&

                            <>    User {notification.data.user.name} has replied in post {notification.data.post.title} </>

                        }
                    </h1>




                </div>
            }
        </li >


    )
}