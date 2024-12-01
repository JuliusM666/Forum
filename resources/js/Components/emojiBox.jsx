import { useEffect, useRef } from "react"
export default function EmojiBox({ componentRef, isComponentVisible, setIsComponentVisible, setInput, input }) {
    const prevCursorPos = useRef(null)
    useEffect(() => {
        let chat = document.getElementById("chat_input")
        chat.focus()
    }, [isComponentVisible])
    useEffect(() => {
        if (prevCursorPos.current != null) {
            let chat = document.getElementById("chat_input")
            chat.setSelectionRange(prevCursorPos.current, prevCursorPos.current + 1)
            prevCursorPos.current = null
        }
    }, [input])
    function addEmoji(emoji) {
        let chat = document.getElementById("chat_input")
        setInput(input.slice(0, chat.selectionEnd) + emoji + input.slice(chat.selectionEnd))
        prevCursorPos.current = (chat.selectionEnd + 1)
        chat.focus()
    }
    return (
        <div ref={componentRef}>
            <button onClick={() => { setIsComponentVisible(!isComponentVisible) }} type="button" className="absolute right-14 top-3 hover:opacity-70"><i className="fa-regular fa-face-smile" /></button>
            {isComponentVisible &&
                <div className="absolute bottom-9 right-8 grid grid-cols-1">
                    <div className=" bg-blue-100 rounded-lg p-2 grid grid-cols-5 overflow-y-scroll max-h-24 scrollbar-thumb-blue-200 scrollbar-track-slate-100 scrollbar-thin">
                        <Emoji addEmoji={addEmoji}>😀</Emoji>
                        <Emoji addEmoji={addEmoji}>😁</Emoji>
                        <Emoji addEmoji={addEmoji}>😂</Emoji>
                        <Emoji addEmoji={addEmoji}>🤣</Emoji>
                        <Emoji addEmoji={addEmoji}>😃</Emoji>
                        <Emoji addEmoji={addEmoji}>😄</Emoji>
                        <Emoji addEmoji={addEmoji}>😅</Emoji>
                        <Emoji addEmoji={addEmoji}>😆</Emoji>
                        <Emoji addEmoji={addEmoji}>😉</Emoji>
                        <Emoji addEmoji={addEmoji}>😊</Emoji>
                        <Emoji addEmoji={addEmoji}>😋</Emoji>
                        <Emoji addEmoji={addEmoji}>😎</Emoji>
                        <Emoji addEmoji={addEmoji}>😍</Emoji>
                        <Emoji addEmoji={addEmoji}>😘</Emoji>
                        <Emoji addEmoji={addEmoji}>🥰</Emoji>
                        <Emoji addEmoji={addEmoji}>😗</Emoji>
                        <Emoji addEmoji={addEmoji}>😙</Emoji>
                        <Emoji addEmoji={addEmoji}>🙂</Emoji>
                        <Emoji addEmoji={addEmoji}>🤗</Emoji>
                        <Emoji addEmoji={addEmoji}>🤩</Emoji>

                    </div>
                    <div className="w-0 h-0 justify-self-end mr-6
                  border-l-[10px] border-l-transparent
                  border-b-[8px] border-b-transparent
                  border-t-[10px] border-t-blue-100
                  border-r-[8px] border-r-transparent">
                    </div>
                </div>
            }
        </div>
    )
}

function Emoji({ children, addEmoji }) {

    return (
        <button type="button" onClick={() => { addEmoji(children) }} className="hover:opacity-70">{children}</button>
    )
}