import Button from "./button";
import useModalVisible from "./Hooks/useModalVisible";
export default function ShareButton({ url }) {
    const [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false)
    function openInNewTab(url) {
        window.open(url, '_blank').focus();
    }
    return (
        <div ref={ref} className="relative">
            <Button handleClick={() => setIsComponentVisible(!isComponentVisible)}>Share</Button>
            {isComponentVisible &&
                <ul className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4 text-xl text-slate-100">
                    <li>
                        <button onClick={() => openInNewTab("https://twitter.com/share?url=" + url)} className="bg-sky-400 px-2 py-1 rounded-full hover:opacity-70 shadow-black drop-shadow-lg"><i className="fa-brands fa-twitter" /></button>
                    </li>
                    <li>
                        <button onClick={() => openInNewTab("https://www.facebook.com/sharer/sharer.php?u=" + url)} className="bg-blue-600 px-2 py-1 rounded-full hover:opacity-70 shadow-black drop-shadow-lg"><i className="fa-brands fa-facebook" /></button>
                    </li>
                    <li>
                        <button onClick={() => openInNewTab("https://www.reddit.com/submit?url=" + url)} className="bg-orange-600 px-2 py-1 rounded-full hover:opacity-70 shadow-black drop-shadow-lg"><i className="fa-brands fa-reddit" /></button>
                    </li>
                </ul>
            }

        </div >

    )
}