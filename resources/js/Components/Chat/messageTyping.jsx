import { useRef, useEffect } from "react"
import Message from "./message"
export default function MessageTyping({ typingMesssage, setTypingMessage }) {
    const timeoutIdRef = useRef();
    useEffect(() => {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setTypingMessage((typingMesssage) => ({}))
        }, 1500);
    }, [typingMesssage])

    return (
        <Message typing={true} isSeen={false} update={() => { }} message={typingMesssage} setIsEdit={() => { }} isEdit={false} setShowEmoji={() => { }} setInput={() => { }} setActiveMessage={() => { }} isActive={false} />
    )
}