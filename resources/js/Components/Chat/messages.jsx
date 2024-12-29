import { useContext, useState, useRef, useEffect, useCallback } from "react"
import { ModalContext } from "../Context/modalContext"
import useModalVisible from "../Hooks/useModalVisible"
import { Link, usePage } from "@inertiajs/react"
import Loading from "../loading"
import Message from "./message"
import EmojiBox from "./emojiBox"
import MessageTyping from "./messageTyping"
import formatDate from "@/utils/formatDate"
import { UsersOnlineContext } from "../Context/usersOnlineContext"
import moment from "moment"

export default function Messages({ activeChat, setActiveChat, messages, setMessages, update, deleteConversation }) {
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
    const messagesRef = useRef(messages)
    useEffect(() => { messagesRef.current = messages }, [messages])
    const isNewMessage = useRef(false)
    const [messageData, setMessageData] = useState("")
    const processing = useRef(false)
    const seenProcessing = useRef(false)
    const deleteConversationProcessing = useRef(false)
    const [errors, setErrors] = useState([])
    const [typingMesssage, setTypingMessage] = useState({})
    const { usersOnline } = useContext(UsersOnlineContext)
    const typingChannel = 'chat.' + Math.max(auth.user.id, activeChat) + '.' + Math.min(auth.user.id, activeChat)
    let prevDate = null
    const messagesForRender = messages.toReversed().map((message, index) => {
        let isMarked = false
        if (prevDate == null || moment(prevDate).format("YYYY-M-D") != moment(message.created_at).format("YYYY-M-D")) {
            prevDate = message.created_at
            isMarked = true
        }
        return (
            <div key={index}>
                {isMarked && <li className="text-center text-xs">{formatDate(message.created_at)}</li>}
                <Message isSeen={seenIndicatorId == message.id} update={update} message={message} setIsEdit={setIsEdit} isEdit={isEdit} setShowEmoji={setIsComponentVisible} setInput={(val) => { setMessageData(val); chatInput.current.textContent = val }} setActiveMessage={setActiveMessage} isActive={activeMessage == message.id} />
                {index == messages.length - 1 && prevDate != null && formatDate(prevDate) != moment(message.created_at).format("HH:mm") && <li className="text-center text-xs">{moment(message.created_at).format("HH:mm")}</li>}
            </div>
        )
    })
    const reset = () => { setErrors([]), setMessageData(""), chatInput.current.innerHTML = "" }
    function typing() {
        if (auth.user) {
            window.Echo.private(typingChannel)
                .whisper('typing', {
                    typerId: auth.user.id,
                    typerImage: auth.user.user_img
                })
        }
    }
    function handleDeleteConversation() {
        confirmAction.current = () => {
            deleteConversationProcessing.current = true
            axios.delete(route("chats.delete_conversation", messages[0].id))
                .then(response => { deleteConversation(messages[0]), setActiveChat(null) })
                .catch(error => console.log(error))
                .finally(deleteConversationProcessing.current = false)
        }
        confirmMessage.current = "This chat will be deleted only for you. Do you want to confirm?"
        setShowConfirm(true)
    }
    function markMessagesAsSeen() {
        if (seenProcessing.current == false) {
            for (const message of messagesRef.current) {

                if (message.reciever_id == auth.user.id) {
                    if (message.is_seen == false) {
                        seenProcessing.current = true
                        axios.post(route("chats.seen", message.id)).then((response) => update(response.data)).catch((error) => console.log(error)).finally(() => seenProcessing.current = false)
                    }
                    break
                }
            }
        }
    }
    function submit(e) {
        e.preventDefault()
        const data = { reciever_id: activeChat, message: messageData }
        const url = isEdit ? route("chats.update", [activeMessage]) : route("chats.store")
        const method = isEdit ? "patch" : "post"
        processing.current = true
        axios({ method: method, url: url, data: data })
            .then((response) => {
                if (method == "post") {
                    update(response.data)
                    isNewMessage.current = true
                }
                else if (method == "patch") {
                    update(response.data)
                    setIsEdit(false)
                }
                reset()
            })
            .catch((error) => setErrors(error.response.data)).finally(() => processing.current = false)

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
        if (auth.user) {
            window.Echo.private(typingChannel)
                .listenForWhisper('typing', (e) => {
                    if (e.typerId != auth.user.id) {
                        setTypingMessage((typingMesssage) => ({ sender_id: e.typerId, sender: { id: e.typerId, user_img: e.typerImage }, message: "Typing..." }))
                    }
                })
        }
        messageWindow.current.onscroll = function () {
            if (messageWindow.current.scrollTop == 0 && nextPageUrl.current != null && messagesRef.current.length > 0) {
                fetchMessages()
            }
            if (messageWindow.current.scrollTop >= (messageWindow.current.scrollHeight - messageWindow.current.offsetHeight) - messageWindow.current.lastChild.offsetHeight) {
                markMessagesAsSeen()
            }
        }
        return (() => {
            setMessages(() => [])
            window.Echo.leave(typingChannel)
        })
    }, [])
    useEffect(() => {
        firstFetch.current = messages.length == 0 ? true : firstFetch.current
        for (const mess of messages) {
            if (mess.sender_id == auth.user.id && mess.is_seen) {
                setSeenIndicatorId(mess.id)
                break
            }
        }
        if (messages.length > 0 && firstFetch.current) {
            messageWindow.current.scrollTop = messageWindow.current.scrollHeight
            markMessagesAsSeen()
            firstFetch.current = false
        }
        else if (isNewMessage.current) {
            isNewMessage.current = false
            messageWindow.current.scrollTop = messageWindow.current.scrollHeight

        }
        if (messageWindow.current.scrollHeight <= messageWindow.current.clientHeight) { // work around for empty messages
            markMessagesAsSeen()
        }
    }, [messages])
    return (
        <div>
            <div className="bg-blue-100 z-20 p-1 grid grid-cols-4  items-center">
                <button onClick={() => setActiveChat(null)} className="justify-self-start hover:opacity-70 ml-1"><i className="fa-solid fa-caret-left text-lg text-slate-700" /></button>
                <div className="flex justify-center col-span-2">
                    <div className="truncate">
                        <Link href={route("user.show", activeChat)}>
                            <div className="relative">
                                <h1 className="font-semibold hover:opacity-70 truncate px-1.5"> {recipient.current.name}</h1>
                                <div className={`absolute w-2 h-2 right-0 bottom-0.5 shadow-sm ${usersOnline.find((user) => user.type == "user" && user.id == activeChat) ? "shadow-green-600" : "shadow-red-600"} border-white border rounded-full ${usersOnline.find((user) => user.type == "user" && user.id == activeChat) ? "bg-green-400" : "bg-red-400"}`} />
                            </div>


                        </Link>
                    </div>

                </div>
                <button disabled={messages.length == 0 || deleteConversationProcessing.current} onClick={() => handleDeleteConversation()}
                    className="justify-self-end hover:opacity-70 mr-1"><i className="fa-solid fa-square-xmark text-lg text-slate-700" /></button>
            </div >
            <ul ref={messageWindow} id="messageWindow" className="overflow-y-scroll min-h-20 max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                {loading && <div className="flex justify-center"><Loading /></div>}
                {messagesForRender}
                {Object.keys(typingMesssage).length > 0 &&
                    <MessageTyping typingMesssage={typingMesssage} setTypingMessage={setTypingMessage} />
                }
                {messages.length == 0 && !loading &&
                    <li className="grid grid-cols-1 text-center p-6 gap-4">
                        <i className="fa-regular fa-comments text-9xl text-blue-300" />
                        <h1 className="font-semibold text-slate-700">No messages, yet.</h1>
                    </li>
                }
            </ul>
            <form onSubmit={submit} className="relative flex gap-1 p-2">
                <div ref={chatInput} className="overflow-y-scroll max-h-52 scrollbar-thumb-slate-700 scrollbar-track-blue-100 scrollbar-thin w-full whitespace-pre-wrap break-all text-sm py-1 pl-2 pr-14 rounded-md bg-blue-100" id="chat_input"
                    onInput={(e) => { setMessageData(e.currentTarget.textContent); typing() }} onKeyDown={(e) => e.key == "Enter" && processing.current == false ? submit(e) : ""}
                    contentEditable data-text={"Type your message here..."} />
                <EmojiBox input={messageData} setInput={(val) => setMessageData(val)} componentRef={ref} isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
                <button disabled={processing.current} className="rounded-full h-fit bg-blue-300 hover:opacity-70 flex p-2 text-center align-middle">
                    {isEdit && <i className="fa-regular fa-pen-to-square" />}
                    {!isEdit && <i className="fa-regular fa-paper-plane" />}
                </button>
            </form>
            {errors.message && <div className="text-red-500 text-start px-5 text-sm">{errors.message}</div>}
        </div >
    )
}


