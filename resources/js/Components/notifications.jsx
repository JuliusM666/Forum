import { useState, useRef } from "react"
import Card from "./card"
import CloseButton from "./closeButton"
import { Link } from "@inertiajs/react"
import moment from "moment"
export default function Notifications({ close, notifications }) {
    const [isShowID, setIsShowID] = useState(null)
    return (
        <div className="fixed z-20 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-11/12">
            <Card name="Notifications" ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                <div className="bg-slate-100 p-2">


                    <div className="flex justify-end p-2">
                        <Link as="button" method="POST" href={route('notification.destroyAll')} preserveScroll className="text-slate-400 cursor-pointer font-semibold rounded-xl px-2 py-1  text-center hover:bg-slate-400 hover:text-slate-100">mark all as read</Link>
                    </div>

                    <ul className="overflow-y-scroll max-h-80">
                        {notifications.map((notification, index) => {
                            return (<Notification notification={notification} key={index} id={notification.id} isShowID={isShowID} setIsShowID={setIsShowID} />)
                        })}
                        {notifications.length == 0 && <h1 className="text-right">no notifications</h1>}
                    </ul>
                </div>
            </Card>
        </div>

    )
}



function Notification({ notification, isShowID, setIsShowID, id }) {
    const isSeen = useRef(false)
    function showNotification() {
        if (isShowID == id) {
            setIsShowID(null)

        }
        else {
            if (!isSeen.current) {
                axios.post(route('notification.destroy', notification.id))
                    .then(function (response) {

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
            isSeen.current = true
            setIsShowID(id)
        }
    }
    return (
        <li className="text-slate-700">
            <div className={`flex justify-between border-slate-400  border-t  p-2 ${isShowID == id ? 'bg-blue-300' : ''}`}>
                <h1>{moment(notification.created_at).fromNow()}</h1>
                <div className="flex gap-4 items-baseline">
                    <h1 className="font-semibold">
                        {notification.data.title}
                    </h1>
                    <button className="hover:opacity-70" onClick={() => showNotification()}>
                        {isShowID != id && <i className="fa-solid fa-caret-down" />}
                        {isShowID == id && <i className="fa-solid fa-caret-up" />}
                    </button>
                </div>
            </div>
            {
                isShowID == id &&
                <div className="border-slate-400  border-t  p-2">
                    {notification.data.message}
                </div>
            }
        </li >
    )
}