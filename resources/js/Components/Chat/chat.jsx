import { usePage } from "@inertiajs/react"
import { useState, useRef, useEffect, useContext } from "react"
import Loading from "../loading"
import UserPictureWithStatus from "../userPictureWithStatus"
import formatDate from "@/utils/formatDate"

export default function Chat({ setActiveChat, chats, setChats, nextPageUrl }) {
    const { auth } = usePage().props
    const [loading, setLoading] = useState(false)
    const chatWindow = useRef()
    function fetchChats() {
        setLoading(true)
        axios.get(nextPageUrl.current)
            .then(function (response) {
                setChats(chats => [...chats, ...response.data.data])
                nextPageUrl.current = response.data.next_page_url
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setLoading(false)
            });
    }
    useEffect(() => {
        if (nextPageUrl.current != null) {
            fetchChats()
        }
        chatWindow.current.onscroll = function () {
            if (chatWindow.current.scrollTop === (chatWindow.current.scrollHeight - chatWindow.current.offsetHeight)) {
                if (nextPageUrl.current != null) {
                    fetchChats()
                }
            }
        }
    }, [])
    return (
        <ul ref={chatWindow} className="overflow-y-scroll min-h-20 max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin">
            {chats.map((chat, index) => {
                return (
                    <li key={index} className={`odd:bg-slate-100 even:bg-slate-200 ${chat.is_seen == false && auth.user.id != chat.sender_id ? "font-bold" : ""}`}>
                        <button onClick={() => setActiveChat(chat.sender.id)} className=" text-slate-700 p-2 gap-1 grid grid-cols-6 items-center hover:opacity-70">
                            <div className="flex justify-end mr-5">
                                <div className="w-9 h-9">
                                    <UserPictureWithStatus user_id={chat.sender.id} user_img={chat.sender.user_img} />
                                </div>
                            </div>
                            <div className="col-span-4 text-start">
                                <h1 className="font-semibold truncate">{chat.sender.name}</h1>
                                <p className="truncate text-xs">{chat.message}</p>

                            </div>
                            <h1 className="text-xs text-end">{formatDate(chat.created_at)}</h1>
                        </button>
                    </li>
                )
            })}
            {chats.length == 0 && !loading && <li className="grid grid-cols-1 text-center p-6 gap-4">
                <i className="fa-regular fa-comments text-9xl text-blue-300" />
                <h1 className="font-semibold text-slate-700">No chats, yet.</h1>
            </li>}
            {loading && <div className="flex justify-center"><Loading /></div>}
        </ul>
    )
}