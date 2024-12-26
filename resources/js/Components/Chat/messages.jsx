import { useContext, useState, useRef, useEffect } from "react"
import { ModalContext } from "../Context/modalContext"
import useModalVisible from "../Hooks/useModalVisible"
import { Link, usePage } from "@inertiajs/react"
import Loading from "../loading"
import Message from "./message"
import EmojiBox from "./emojiBox"

export default function Messages({ activeChat, setActiveChat, messages, messagesRef, setMessages, update, deleteConversation }) {
    const { setShowConfirm, confirmAction, confirmMessage } = useContext(ModalContext)
    const { auth } = usePage().props
    const [seenIndicatorId, setSeenIndicatorId] = useState(null)
    const [activeMessage, setActiveMessage] = useState(null)
    const [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false)
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const nextPageUrl = useRef(route('chats.show', activeChat))
    const messageWindow = useRef(null)
    const recipient = useRef({})
    const chatInput = useRef()
    const firstFetch = useRef(true)

    const isNewMessage = useRef(false)
    const [messageData, setMessageData] = useState("")
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState([])
    const reset = () => { setErrors([]), setMessageData(""), chatInput.current.innerHTML = "" }

    function markMessagesAsSeen() {
        for (const message of messagesRef.current) {
            if (message.sender_id != auth.user.id) {
                if (message.is_seen == false) {
                    axios.post(route("chats.seen", message.id)).then((response) => update(response.data)).catch((error) => console.log(error))
                }
                break
            }
        }
    }
    function submit(e) {
        e.preventDefault()
        const data = { reciever_id: activeChat, message: messageData }
        const url = isEdit ? route("chats.update", [activeMessage]) : route("chats.store")
        const method = isEdit ? "patch" : "post"
        setProcessing(true)
        axios({ method: method, url: url, data: data })
            .then((response) => {
                if (method == "post") {
                    update(response.data)
                    isNewMessage.current = true
                }
                else if (method == "patch") {
                    update(response.data)
                }
                reset()
            })
            .catch((error) => setErrors(error.response.data)).finally(() => setProcessing(false))

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
            if (messageWindow.current.scrollTop === (messageWindow.current.scrollHeight - messageWindow.current.offsetHeight)) {
                markMessagesAsSeen()
            }
        }
        return (() => setMessages([]))
    }, [])
    useEffect(() => {
        for (const mess of messages) {
            if (mess.sender_id == auth.user.id && mess.is_seen) {
                setSeenIndicatorId(mess.id)
                break
            }
        }
        if (messages.length > 0 && firstFetch.current) {
            messageWindow.current.scrollTop = messageWindow.current.scrollHeight
            markMessagesAsSeen()
            if (messageWindow.current.scrollTop == 0 && nextPageUrl.current != null) {
                fetchMessages()
            }
            else {
                firstFetch.current = false
            }
        }
        else if (isNewMessage.current) {
            isNewMessage.current = false
            messageWindow.current.scrollTop = messageWindow.current.scrollHeight

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
                    confirmAction.current = () => { axios.delete(route("chats.delete_conversation", recipient.current.id)).then(response => { deleteConversation(activeChat); setActiveChat(null) }).catch(error => console.log(error)) }
                        , setShowConfirm(true), confirmMessage.current = "This chat will be deleted only for you. Do you want to confirm?"
                }}
                    className="justify-self-end hover:opacity-70 mr-1"><i className="fa-solid fa-square-xmark text-lg text-slate-700" /></button>
            </div>
            <ul ref={messageWindow} id="messageWindow" className="overflow-y-scroll min-h-20 max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                {loading && <div className="flex justify-center"><Loading /></div>}
                {messages.toReversed().map((message, index) => {
                    return (<Message isSeen={seenIndicatorId == message.id} update={update} message={message} setIsEdit={setIsEdit} isEdit={isEdit} setShowEmoji={setIsComponentVisible} setInput={(val) => { setMessageData(val); chatInput.current.textContent = val }} setActiveMessage={setActiveMessage} isActive={activeMessage == message.id} key={index} />)
                })}
            </ul>
            <form onSubmit={submit} className="relative flex gap-1 p-2">
                <div ref={chatInput} className="overflow-y-scroll max-h-52 scrollbar-thumb-slate-700 scrollbar-track-blue-100 scrollbar-thin w-full whitespace-pre-wrap break-all text-sm py-1 pl-2 pr-14 rounded-md bg-blue-100" id="chat_input"
                    onInput={(e) => { setMessageData(e.currentTarget.textContent) }} onKeyDown={(e) => e.key == "Enter" && processing == false ? submit(e) : ""}
                    contentEditable data-text={"Type your message here..."} />
                <EmojiBox input={messageData} setInput={(val) => setMessageData(val)} componentRef={ref} isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
                <button disabled={processing} className="rounded-full h-fit bg-blue-300 hover:opacity-70 flex p-2 text-center align-middle">
                    {isEdit && <i className="fa-regular fa-pen-to-square" />}
                    {!isEdit && <i className="fa-regular fa-paper-plane" />}
                </button>
            </form>
            {errors.message && <div className="text-red-500 text-start px-5 text-sm">{errors.message}</div>}
        </div >
    )
}