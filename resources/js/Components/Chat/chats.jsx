import { useContext } from "react"
import { ModalContext } from "../Context/modalContext"
import CloseButton from "../closeButton"
import Card from "../card"
import Chat from "./chat"
import Messages from "./messages"

export default function Chats({ close, chats, setChats, nextPageUrl }) {
    const { activeChat, setActiveChat } = useContext(ModalContext) // recipient id
    return (
        <div className="fixed z-20 text-slate-700 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-11/12">
            <Card name="Chats" ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                <div className="bg-slate-100">
                    {activeChat == null && <Chat nextPageUrl={nextPageUrl} chats={chats} setChats={setChats} setActiveChat={setActiveChat} />}
                    {activeChat != null && <Messages setSeen={((id) => {
                        setChats(chats.map((chat) => {
                            if (chat.id == id) {
                                chat.is_seen = true
                            }
                            return chat
                        }))
                    })} removeChat={(id) => { setChats(chats.filter(chat => chat.sender.id !== id)) }} activeChat={activeChat} setActiveChat={setActiveChat} />}
                </div>
            </Card>
        </div>

    )
}