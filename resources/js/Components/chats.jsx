import { useState, useContext, useEffect, useRef } from "react"
import useModalVisible from "./Hooks/useModalVisible"
import Card from "./card"
import CloseButton from "./closeButton"
import { Link, usePage, useForm } from "@inertiajs/react"
import moment from "moment"
import UserPicture from "./userPicture"
import { ModalContext } from "./Context/modalContext"
import EmojiBox from "./emojiBox"
import Loading from "./loading"
export default function Chats({ close }) {
    const { auth } = usePage().props
    const { activeChat, setActiveChat } = useContext(ModalContext) // recipient id

    // if (activeChat != null && !chats.hasOwnProperty(activeChat)) {  // for new chat
    //     chats[activeChat] = { user: "user1", message: "Hi", created_at: "2024-10-19 15:36:35", messages: [] }
    // }



    return (
        <div className="fixed z-20 text-slate-700 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-11/12">
            <Card name="Chats" ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                <div className="bg-slate-100">
                    {activeChat == null && <Chat setActiveChat={setActiveChat} />}
                    {activeChat != null && <Messages activeChat={activeChat} setActiveChat={setActiveChat} />}
                    {auth.chats.total == 0 && <h1 className="text-right p-2">no messages</h1>}
                </div>
            </Card>
        </div>

    )
}

function Chat({ setActiveChat }) {
    const { auth } = usePage().props
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const chatWindow = document.getElementById("chatWindow")
        chatWindow.onscroll = function () {
            if (chatWindow.scrollTop === (chatWindow.scrollHeight - chatWindow.offsetHeight)) {
                if (auth.chats.paginator.current_page != auth.chats.paginator.last_page) {
                    setLoading(true)
                    axios.get('chats?chat_page=' + (auth.chats.paginator.current_page + 1))
                        .then(function (response) {
                            auth.chats.paginator.data = auth.chats.paginator.data.concat(response.data.paginator.data)
                            auth.chats.paginator.current_page = auth.chats.paginator.current_page + 1
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                        .finally(function () {
                            setLoading(false)
                        });

                }
            }
        }
    }, [])
    return (
        <ul id="chatWindow" className="overflow-y-scroll max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin " >
            {auth.chats.paginator.data.map((chat, index) => {
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
                                <p className={`truncate text-sm ${chat.is_seen ? "" : " font-bold"}`}>{chat.message}</p>
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
function Messages({ activeChat, setActiveChat }) {
    const { setShowConfirm, destroyRoute, confirmMessage } = useContext(ModalContext)
    const [activeMessage, setActiveMessage] = useState(null)
    const [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const nextPageUrl = useRef(route('chats.show', activeChat))
    const messageWindow = useRef(null)
    const recipient = useRef({})
    const firstFetch = useRef(true)
    const { data, setData, post, reset, processing, errors } = useForm({
        message: "",
        reciever_id: ""
    })
    function submit(e) {
        e.preventDefault()
        post(route("chats.store", recipient.current.id), {
            preserveScroll: true,
            onSuccess: () => reset('message'),
        })
    }
    async function fetchMessages() {
        setLoading(true)
        axios.get(nextPageUrl.current)
            .then(function (response) {
                setMessages(messages => ([...messages, ...response.data.messages.data]))
                nextPageUrl.current = response.data.messages.next_page_url
                recipient.current = response.data.recipient
                setData("reciever_id", recipient.current.id)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setLoading(false)
            });

    }
    useEffect(() => {
        fetchMessages()
        messageWindow.current.onscroll = function () {
            if (messageWindow.current.scrollTop == 0 && nextPageUrl.current != null) {
                fetchMessages()
            }
        }
    }, [])
    useEffect(() => {
        if (messages.length > 0 && firstFetch.current) {
            messageWindow.current.scrollTop = messageWindow.current.scrollHeight
            if (messageWindow.current.scrollTop == 0 && nextPageUrl.current != null) {
                fetchMessages()
            }
            else {
                firstFetch.current = false
            }
        }
    }, [messages])
    return (
        <div className="relative">
            <div className="bg-blue-100 z-20 p-1 grid grid-cols-3  items-center">
                <button onClick={() => setActiveChat(null)} className="justify-self-start hover:opacity-70 ml-1"><i className="fa-solid fa-caret-left text-lg text-slate-700" /></button>
                <div className="truncate text-center">
                    <Link href={route("user.show", activeChat)} className="font-semibold hover:opacity-70">
                        {recipient.current.name}</Link>
                </div>
                <button onClick={() => { destroyRoute.current = route("chats.delete_conversation", recipient.current.id), setShowConfirm(true), confirmMessage.current = "This chat will be deleted for only you. Do you want to confirm?" }}
                    className="justify-self-end hover:opacity-70 mr-1"><i className="fa-solid fa-square-xmark text-lg text-slate-700" /></button>
            </div>
            <ul ref={messageWindow} id="messageWindow" className="overflow-y-scroll max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                {loading && <div className="flex justify-center"><Loading /></div>}
                {messages.toReversed().map((message, index) => {
                    return (<Message message={message} setShowEmoji={setIsComponentVisible} setInput={(val) => setData("message", val)} handleMessageClick={() => setActiveMessage(activeMessage != index ? index : null)} isActive={activeMessage == index} key={index} />)
                })}
            </ul>
            <form onSubmit={submit} className="relative flex gap-1 h-12 p-2">
                <input id="chat_input" value={data.message} onChange={(e) => { setData("message", e.target.value) }} className="w-full rounded-full bg-blue-100 border-none pr-8" placeholder="Type your message here..." />
                <EmojiBox input={data.message} setInput={(val) => setData("message", val)} componentRef={ref} isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
                <button disabled={processing} className="rounded-full bg-blue-300 hover:opacity-70 flex justify-center items-center p-2"><i className="fa-regular fa-paper-plane" /></button>
            </form>
            {errors.message && <div className="text-red-500 text-start px-5 text-sm">{errors.message}</div>}
        </div>
    )
}
function Message({ message, handleMessageClick, isActive, setInput, setShowEmoji }) {
    const { setShowConfirm, destroyRoute, confirmMessage } = useContext(ModalContext)
    const { auth } = usePage().props
    if (message.sender.id == auth.user.id) {
        return (
            <div>
                {isActive &&
                    <div className="flex gap-3 justify-end w-4/5">
                        <button onClick={() => setShowEmoji(true)} className="hover:opacity-70"><i className="fa-solid fa-circle-plus" /></button>
                        {message.deleted_at == null &&
                            <>
                                <button onClick={() => setInput(message.message)} className="hover:opacity-70"> <i className="fa-regular fa-pen-to-square" /></button>
                                <button onClick={() => { confirmMessage.current = "This message will be deleted. Do you want to confirm?", setShowConfirm(true), destroyRoute.current = route("chats.destroy", message.id) }} className="hover:opacity-70"> <i className="fa-solid fa-circle-xmark" /></button>
                            </>
                        }
                    </div>
                }
                <div className="flex justify-end p-2">

                    <button onClick={() => handleMessageClick()} className="flex gap-0 hover:opacity-70 justify-end w-4/5">
                        <div className="bg-blue-300 rounded-md p-2">
                            {message.message}
                        </div>
                        <div className="w-0 h-0 mt-2
                                        border-l-[10px] border-l-blue-300
                                        border-b-[8px] border-b-transparent
                                        border-t-[8px] border-t-transparent
                                        border-r-[8px] border-r-transparent">
                        </div>
                    </button>

                    <div className="h-9 w-9">
                        <UserPicture user_id={message.sender.id} user_img={message.sender.user_img} />
                    </div>

                </div>
            </div>
        )
    } return (
        <div className="flex justify-start p-2">
            <div className="h-9 w-9">
                <UserPicture user_id={message.sender.id} user_img={message.sender.user_img} />
            </div>
            <div className="flex gap-0 justify-start w-4/5">
                <div className="w-0 h-0 mt-2
                                border-l-[8px] border-l-transparent
                                border-b-[8px] border-b-transparent
                                border-t-[8px] border-t-transparent
                                border-r-[10px] border-r-blue-100">
                </div>
                <div className="bg-blue-100 rounded-md p-2">
                    {message.message}
                </div>

            </div>


        </div>
    )
}
