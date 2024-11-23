import { useState, useContext, useEffect, useRef } from "react"
import useModalVisible from "./Hooks/useModalVisible"
import Card from "./card"
import CloseButton from "./closeButton"
import { Link, usePage } from "@inertiajs/react"
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
                if (auth.chats.current_page != auth.chats.last_page) {
                    setLoading(true)
                    axios.get('/api/chats?chat_page=' + (auth.chats.current_page + 1))
                        .then(function (response) {
                            auth.chats.data = auth.chats.data.concat(response.data.data)
                            auth.chats.current_page = auth.chats.current_page + 1
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
        <ul id="chatWindow" className="overflow-y-scroll max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
            {auth.chats.data.map((chat, index) => {
                return (
                    <li key={index}>
                        <button onClick={() => setActiveChat(chat.sender.id)} className="odd:bg-slate-100 text-slate-700 even:bg-slate-200 p-2 gap-1 grid grid-cols-6 items-center hover:opacity-70">
                            <div className="flex justify-end mr-5">
                                <div className="w-9 h-9">
                                    <UserPicture user_id={chat.sender.id} user_img={chat.sender.user_img} />
                                </div>
                            </div>
                            <div className="col-span-4 text-start">
                                <h1 className="font-semibold">{chat.sender.name}</h1>
                                <p className="truncate">{chat.message}</p>
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
    const [input, setInput] = useState("")
    const [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const nextPageUrl = useRef('/api/chats/' + activeChat)
    const messageWindow = useRef(null)
    const firstLoad = useRef(true)
    async function fetchMessages() {
        setLoading(true)
        axios.get(nextPageUrl.current)
            .then(function (response) {
                setMessages(messages => ([...response.data.data, ...messages]))
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
        fetchMessages()
        messageWindow.current.onscroll = function () {
            if (messageWindow.current.scrollTop == 0 && nextPageUrl.current != null) {
                fetchMessages()
            }
        }
    }, [])
    useEffect(() => {
        if (firstLoad.current == true) {
            if (messageWindow.current.scrollHeight != 0) {
                messageWindow.current.scrollTop = messageWindow.current.scrollHeight
                firstLoad.current = false
            }
        }
    }, [messages])
    return (
        <div className="relative">
            <div className="bg-blue-100 z-20 p-1 grid grid-cols-3 justify-items-center items-center">
                <button onClick={() => setActiveChat(null)} className="justify-self-start hover:opacity-70 ml-1"><i className="fa-solid fa-caret-left text-lg text-slate-700" /></button>
                <Link href={route("user.show", 1)} className="font-semibold hover:opacity-70">User</Link>
                <button onClick={() => { setShowConfirm(true), destroyRoute.current = "destroy_route", confirmMessage.current = "This chat will only be deleted for you. Do you want to confirm?" }}
                    className="justify-self-end hover:opacity-70 mr-1"><i className="fa-solid fa-square-xmark text-lg text-slate-700" /></button>
            </div>
            <ul ref={messageWindow} id="messageWindow" className="overflow-y-scroll max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                {loading && <div className="flex justify-center"><Loading /></div>}
                {messages.map((message, index) => {
                    return (<Message message={message} setShowEmoji={setIsComponentVisible} setInput={setInput} handleMessageClick={() => setActiveMessage(activeMessage != index ? index : null)} isActive={activeMessage == index} key={index} />)
                })}
            </ul>
            <form className="relative flex gap-1 h-12 p-2">

                <input value={input} className="w-full rounded-full bg-blue-100 border-none pr-8" placeholder="Type your message here..." />
                <EmojiBox componentRef={ref} isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
                <button className="rounded-full bg-blue-300 hover:opacity-70 flex justify-center items-center p-2"><i className="fa-regular fa-paper-plane" /></button>
            </form>

        </div>
    )
}
function Message({ message, handleMessageClick, isActive, setInput, setShowEmoji }) {
    const { setShowConfirm, destroyRoute, confirmMessage } = useContext(ModalContext)
    if (message.id == 1) {
        return (
            <div className="relative flex justify-end p-2">
                {isActive &&
                    <div className="gap-3 flex items-center mr-1">
                        <button onClick={() => setShowEmoji(true)} className="hover:opacity-70"><i className="fa-solid fa-circle-plus" /></button>
                        <button onClick={() => setInput(message.message)} className="hover:opacity-70"> <i className="fa-regular fa-pen-to-square" /></button>
                        <button onClick={() => { setShowConfirm(true), destroyRoute.current = "destroy_route", confirmMessage.current = "This message will only be deleted for you. Do you want to confirm?" }} className="hover:opacity-70"> <i className="fa-solid fa-circle-xmark" /></button>
                    </div>
                }
                <button onClick={() => handleMessageClick()} className="flex gap-0  hover:opacity-70">
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

                <div className="w-9 h-9">
                    <UserPicture user_id={message.sender.id} user_img={message.sender.user_img} />
                </div>

            </div>
        )
    } return (
        <div className="flex justify-start p-2 gap-3">
            <div className=" h-8 w-12">
                <UserPicture user_id={message.sender.id} user_img={message.sender.user_img} />
            </div>
            <div className="flex gap-0">
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
