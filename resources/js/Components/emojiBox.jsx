import { useEffect, useRef } from "react"
export default function EmojiBox({ componentRef, isComponentVisible, setIsComponentVisible, setInput, input }) {
    useEffect(() => {
        if (isComponentVisible) {
            document.getElementById("chat_input").focus()
        }
    }, [isComponentVisible])
    function getCursorPosition() {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const clonedRange = range.cloneRange()
        clonedRange.selectNodeContents(document.getElementById("chat_input"))
        clonedRange.setEnd(range.endContainer, range.endOffset)
        return clonedRange.toString().length
    }
    function setCursorPosition(targetPosition) {
        const element = document.getElementById("chat_input")
        const range = document.createRange()
        const selection = window.getSelection()
        range.setStart(element.childNodes[0], targetPosition)
        selection.removeAllRanges()
        selection.addRange(range)
    }
    function addEmoji(emoji) {
        let cursorPos = getCursorPosition()
        let updatedInput = input.slice(0, cursorPos) + emoji + input.slice(cursorPos)
        setInput(updatedInput)
        document.getElementById("chat_input").textContent = updatedInput
        setCursorPosition(cursorPos + 2)
    }
    return (
        <div ref={componentRef} className="static">
            <button onClick={() => { setIsComponentVisible(!isComponentVisible) }} type="button" className="absolute right-14 top-3 hover:opacity-70"><i className="fa-regular fa-face-smile" /></button>
            {isComponentVisible &&
                <div className="absolute -top-24 right-8 grid grid-cols-1">
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