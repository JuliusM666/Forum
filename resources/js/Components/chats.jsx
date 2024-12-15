import { useState, useContext, useEffect, useRef } from "react"
import useModalVisible from "./Hooks/useModalVisible"
import Card from "./card"
import CloseButton from "./closeButton"
import { Link, usePage, useForm, router } from "@inertiajs/react"
import moment from "moment"
import UserPicture from "./userPicture"
import { ModalContext } from "./Context/modalContext"
import EmojiBox from "./emojiBox"
import Loading from "./loading"
export default function Chats({ close }) {
    const { activeChat, setActiveChat } = useContext(ModalContext) // recipient id
    return (
        <div className="fixed z-20 text-slate-700 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-11/12">
            <Card name="Chats" ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                <div className="bg-slate-100">
                    {activeChat == null && <Chat setActiveChat={setActiveChat} />}
                    {activeChat != null && <Messages activeChat={activeChat} setActiveChat={setActiveChat} />}
                </div>
            </Card>
        </div>

    )
}

function Chat({ setActiveChat }) {
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
function Messages({ activeChat, setActiveChat }) {
    const { setShowConfirm, confirmAction, confirmMessage } = useContext(ModalContext)
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
        reciever_id: activeChat
    })
    function submit(e) {
        e.preventDefault()
        post(route("chats.store"), {
            preserveScroll: true,
            onSuccess: () => { reset('message'), document.getElementById("chat_input").innerHTML = "" }
        })
    }
    function fetchMessages() {
        setLoading(true)
        axios.get(nextPageUrl.current)
            .then(function (response) {
                setMessages(messages => ([...messages, ...response.data.messages.data]))
                nextPageUrl.current = response.data.messages.next_page_url
                recipient.current = response.data.recipient
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
                <button onClick={() => {
                    confirmAction.current = () => { router.delete(route("chats.delete_conversation", recipient.current.id), {}, { preserveScroll: true }), setActiveChat(null) }
                        , setShowConfirm(true), confirmMessage.current = "This chat will be deleted for only you. Do you want to confirm?"
                }}
                    className="justify-self-end hover:opacity-70 mr-1"><i className="fa-solid fa-square-xmark text-lg text-slate-700" /></button>
            </div>
            <ul ref={messageWindow} id="messageWindow" className="overflow-y-scroll min-h-20 max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                {loading && <div className="flex justify-center"><Loading /></div>}
                {messages.toReversed().map((message, index) => {
                    return (<Message message={message} setShowEmoji={setIsComponentVisible} setInput={(val) => setData("message", val)} handleMessageClick={() => setActiveMessage(activeMessage != index ? index : null)} isActive={activeMessage == index} key={index} />)
                })}
            </ul>
            <form onSubmit={submit} className="relative flex gap-1 p-2">
                <div className="overflow-y-scroll max-h-52 scrollbar-thumb-slate-700 scrollbar-track-blue-100 scrollbar-thin w-full whitespace-pre-wrap break-all text-sm py-1 pl-2 pr-14 rounded-md bg-blue-100" id="chat_input"
                    onInput={(e) => { setData("message", e.currentTarget.textContent) }} onKeyDown={(e) => e.key == "Enter" ? submit(e) : ""}
                    contentEditable data-text={"Type your message here..."} ></div>
                <EmojiBox input={data.message} setInput={(val) => setData("message", val)} componentRef={ref} isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
                <button disabled={processing} className="rounded-full h-fit bg-blue-300 hover:opacity-70 flex justify-center items-center p-2"><i className="fa-regular fa-paper-plane" /></button>
            </form>
            {errors.message && <div className="text-red-500 text-start px-5 text-sm">{errors.message}</div>}
        </div>
    )
}
function Message({ message, handleMessageClick, isActive, setInput, setShowEmoji }) {
    const { setShowConfirm, confirmAction, confirmMessage } = useContext(ModalContext)
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
                                <button onClick={() => {
                                    confirmMessage.current = "This message will be deleted. Do you want to confirm?", setShowConfirm(true),
                                        confirmAction.current = () => router.delete(route("chats.destroy", message.id))
                                }} className="hover:opacity-70"> <i className="fa-solid fa-circle-xmark" /></button>
                            </>
                        }
                    </div>
                }
                <div className="flex justify-end p-2">

                    <button onClick={() => handleMessageClick()} className="flex gap-0 hover:opacity-70 justify-end w-4/5">
                        <div className="bg-blue-300 rounded-md p-2 whitespace-pre-line break-all">
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
                <div className="bg-blue-100 rounded-md p-2 whitespace-pre-line break-all">
                    {message.message}
                </div>

            </div>


        </div>
    )
}
