import { usePage } from "@inertiajs/react"
import { useState, useRef, useEffect } from "react"
import Loading from "../loading"
import UserPictureWithStatus from "../userPictureWithStatus"
import formatDate from "@/utils/formatDate"

export default function Chat({ setActiveChat, chats, setChats, nextPageUrl, query, setQuery }) {
    const { auth } = usePage().props
    const [loading, setLoading] = useState(false)
    const firstLoad = useRef(true)
    const chatWindow = useRef()
    const abortController = useRef(new AbortController())
    function fetchChats() {
        setLoading(true)
        let errorCode = null
        axios.get(nextPageUrl.current, { signal: abortController.current.signal })
            .then(function (response) {
                setChats(chats => [...chats, ...response.data.data])
                nextPageUrl.current = response.data.next_page_url
            })
            .catch(function (error) {
                errorCode = error.code
                if (error.code != "ERR_CANCELED") {
                    console.log(error)
                }
            })
            .finally(function () {
                if (errorCode == null) {
                    setLoading(false)
                }

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
    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false
        }
        else if (query == "") {
            abortController.current.abort()
            abortController.current = new AbortController()
            nextPageUrl.current = route("chats.index")
            setChats([])
            fetchChats()
        }
        else {
            abortController.current.abort()
            abortController.current = new AbortController()
            nextPageUrl.current = route("chats.search", [query])
            setChats([])
            fetchChats()
        }
    }, [query])
    return (
        <div>
            <div className="px-4">
                <div className=" bg-slate-100 h-[10vh] border-b py-4 border-slate-300">
                    <div className="relative align-middle ">

                        <input value={query} onChange={e => { setQuery(e.target.value) }} className="w-full shadow-sm rounded-2xl text-md py-1 pr-8 border-0 focus:ring-0 max-sm:border border-1" type="text" placeholder="search..." />
                        <button disabled={query == ""} onClick={() => setQuery("")} className="h-full hover:opacity-70 text-sm absolute right-2">
                            {query != "" && <i className="fa fa-x" />}
                            {query == "" && <i className="fa fa-search" />}
                        </button>
                    </div>
                </div>
            </div>

            <ul ref={chatWindow} className="overflow-y-scroll h-[40.5vh] scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin">
                {chats.map((chat, index) => {
                    return (
                        <li key={index} className={`odd:bg-slate-100 even:bg-slate-200 ${chat.is_seen == false && auth.user.id != chat.sender_id ? "font-bold" : ""}`}>
                            <button onClick={() => setActiveChat(chat.sender.id)} className="w-full text-slate-700 p-2 gap-1 grid grid-cols-6 items-center hover:opacity-70">
                                <div className="flex justify-end mr-5">
                                    <div className="w-9 h-9">
                                        <UserPictureWithStatus user_id={chat.sender.id} user_img={chat.sender.user_img} />
                                    </div>
                                </div>
                                <div className="col-span-3 text-start">
                                    <h1 className="font-semibold truncate">{chat.sender.name}</h1>
                                    <p className="truncate text-xs">{chat.message}</p>

                                </div>
                                <h1 className="text-xs col-span-2 text-end">{chat.created_at != null && formatDate(chat.created_at)}</h1>
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
        </div >
    )
}