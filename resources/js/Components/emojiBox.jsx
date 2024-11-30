
export default function EmojiBox({ componentRef, isComponentVisible, setIsComponentVisible }) {
    return (
        <div ref={componentRef}>
            <button onClick={() => { setIsComponentVisible(!isComponentVisible) }} type="button" className="absolute right-14 top-3 hover:opacity-70"><i className="fa-regular fa-face-smile" /></button>
            {isComponentVisible &&
                <div className="absolute bottom-9 right-8 grid grid-cols-1 p-2">
                    <div className=" bg-blue-100 rounded-lg p-2 grid grid-cols-5 overflow-y-scroll max-h-24 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin">
                        <button type="button" className="hover:opacity-70">😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
                        <button>😀</button>
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