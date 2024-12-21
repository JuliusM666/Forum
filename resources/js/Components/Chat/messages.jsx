import { useContext, useState, useRef, useEffect } from "react"
import { ModalContext } from "../Context/modalContext"
import useModalVisible from "../Hooks/useModalVisible"
import { Link, router, useForm } from "@inertiajs/react"
import Loading from "../loading"
import Message from "./message"
import EmojiBox from "./emojiBox"

export default function Messages({ activeChat, setActiveChat }) {
    const { setShowConfirm, confirmAction, confirmMessage } = useContext(ModalContext)
    const [activeMessage, setActiveMessage] = useState(null)
    const [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const nextPageUrl = useRef(route('chats.show', activeChat))
    const messageWindow = useRef(null)
    const recipient = useRef({})
    const chatInput = useRef()
    const firstFetch = useRef(true)
    const { data, setData, post, patch, reset, processing, errors } = useForm({
        message: "",
        reciever_id: activeChat
    })
    function submit(e) {
        e.preventDefault()
        if (isEdit) {
            patch(route("chats.update", [activeMessage]), {
                preserveScroll: true,
                onSuccess: () => { reset('message'), chatInput.current.innerHTML = "" }
            })
        }
        else {
            post(route("chats.store"), {
                preserveScroll: true,
                onSuccess: () => { reset('message'), chatInput.current.innerHTML = "" }
            })
        }

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
                        , setShowConfirm(true), confirmMessage.current = "This chat will be deleted only for you. Do you want to confirm?"
                }}
                    className="justify-self-end hover:opacity-70 mr-1"><i className="fa-solid fa-square-xmark text-lg text-slate-700" /></button>
            </div>
            <ul ref={messageWindow} id="messageWindow" className="overflow-y-scroll min-h-20 max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                {loading && <div className="flex justify-center"><Loading /></div>}
                {messages.toReversed().map((message, index) => {
                    return (<Message message={message} setIsEdit={setIsEdit} isEdit={isEdit} setShowEmoji={setIsComponentVisible} setInput={(val) => { setData("message", val); chatInput.current.textContent = val }} setActiveMessage={setActiveMessage} isActive={activeMessage == message.id} key={index} />)
                })}
            </ul>
            <form onSubmit={submit} className="relative flex gap-1 p-2">
                <div ref={chatInput} className="overflow-y-scroll max-h-52 scrollbar-thumb-slate-700 scrollbar-track-blue-100 scrollbar-thin w-full whitespace-pre-wrap break-all text-sm py-1 pl-2 pr-14 rounded-md bg-blue-100" id="chat_input"
                    onInput={(e) => { setData("message", e.currentTarget.textContent) }} onKeyDown={(e) => e.key == "Enter" ? submit(e) : ""}
                    contentEditable data-text={"Type your message here..."} />
                <EmojiBox input={data.message} setInput={(val) => setData("message", val)} componentRef={ref} isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
                <button disabled={processing} className="rounded-full h-fit bg-blue-300 hover:opacity-70 flex p-2 text-center align-middle">
                    {isEdit && <i className="fa-regular fa-pen-to-square" />}
                    {!isEdit && <i className="fa-regular fa-paper-plane" />}
                </button>
            </form>
            {errors.message && <div className="text-red-500 text-start px-5 text-sm">{errors.message}</div>}
        </div>
    )
}