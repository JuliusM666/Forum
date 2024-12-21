import { usePage } from "@inertiajs/react"
import { useState, useRef, useEffect } from "react"
import Loading from "../loading"
import UserPicture from "../userPicture"
import moment from "moment"

export default function Chat({ setActiveChat }) {
    const { auth } = usePage().props
    const [loading, setLoading] = useState(false)
    const chatWindow = useRef()
    const nextPageUrl = useRef(route("chats.index"))
    function fetchChats() {
        setLoading(true)
        axios.get(nextPageUrl.current)
            .then(function (response) {
                auth.chats = [...auth.chats, ...response.data.data]
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
        fetchChats()
        chatWindow.current.onscroll = function () {
            if (chatWindow.current.scrollTop === (chatWindow.current.scrollHeight - chatWindow.current.offsetHeight)) {
                if (nextPageUrl.current != null) {
                    fetchChats()
                }
            }
        }
    }, [])
    return (
        <ul ref={chatWindow} className="overflow-y-scroll max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin " >
            {auth.chats.map((chat, index) => {
                return (
                    <li key={index} className="odd:bg-slate-100 even:bg-slate-200">
                        <button onClick={() => setActiveChat(chat.sender.id)} className=" text-slate-700 p-2 gap-1 grid grid-cols-6 items-center hover:opacity-70">
                            <div className="flex justify-end mr-5">
                                <div className="w-9 h-9">
                                    <UserPicture user_id={chat.sender.id} user_img={chat.sender.user_img} />
                                </div>
                            </div>
                            <div className="col-span-4 text-start">
                                <h1 className="font-semibold">{chat.sender.name}</h1>
                                {chat.is_seen == false && chat.sender_id != auth.user.id
                                    ? <p className="truncate text-sm font-bold">{chat.message}</p>
                                    : <p className="truncate text-sm">{chat.message}</p>
                                }
                            </div>
                            <h1 className="text-xs font-semibold text-end">{moment(chat.created_at).fromNow()}</h1>
                        </button>
                    </li>
                )
            })}
            {loading && <div className="flex justify-center"><Loading /></div>}
        </ul>
    )
}