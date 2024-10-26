import { useState } from "react"
import Card from "./card"
import CloseButton from "./closeButton"
import { Link } from "@inertiajs/react"
import moment from "moment"
import UserPicture from "./userPicture"
export default function Chats({ close, chats }) {
    const [activeChat, setActiveChat] = useState(null)
    return (
        <div className="fixed z-20 text-slate-700 right-0 bottom-0 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-8/12 max-sm:w-11/12">
            <Card name="Chats" ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                <div className="bg-slate-100">
                    <ul className="overflow-y-scroll max-h-80 scrollbar-thumb-slate-700 scrollbar-track-slate-200 scrollbar-thin" >
                        {activeChat == null && chats.map((chat, index) => {
                            return (<Chat chat={chat} key={index} handleOnClick={() => setActiveChat(index)} />)
                        })}
                        {activeChat != null && <Messages handleBackClick={() => setActiveChat(null)} messages={chats[activeChat].messages} />}
                        {chats.length == 0 && <h1 className="text-right p-2">no messages</h1>}
                    </ul>
                </div>
            </Card>
        </div>

    )
}

function Chat({ chat, handleOnClick }) {
    return (
        <button onClick={() => handleOnClick()} className="odd:bg-slate-100 text-slate-700 even:bg-slate-200 p-2 grid grid-cols-6 items-center hover:opacity-70">
            <div className="flex justify-end mr-5">
                <div className="w-9 h-9">
                    <UserPicture user_id={1} user_img={"/public/user_profile_pictures/YB10jCxFYeYSDe7YX9NhL0vR6i4i25uFo01AITXj.png"} />
                </div>
            </div>
            <div className="col-span-4 text-start">
                <h1 className="font-semibold">{chat.user}</h1>
                <h1>{chat.message}</h1>
            </div>
            <h1 className="text-xs font-semibold text-end">{moment(chat.created_at).fromNow()}</h1>
        </button>
    )
}
function Messages({ messages, handleBackClick }) {
    return (
        <div>
            <div className="sticky top-0 bg-blue-100 z-20 p-1 grid grid-cols-3 justify-items-center items-center">
                <button onClick={() => handleBackClick()} className="justify-self-start hover:opacity-70 ml-1"><i className="fa-solid fa-caret-left text-lg text-slate-700" /></button>
                <Link href={route("user.show", 1)} className="font-semibold hover:opacity-70">User</Link>
            </div>
            {messages.map((message, index) => {
                return (<Message message={message} key={index} />)
            })}
            <div className="sticky bottom-0">
                <input />
            </div>
        </div>
    )
}
function Message({ message }) {
    if (message.id == 1) {
        return (
            <div className="flex justify-end p-2">
                <div className="flex gap-0">
                    <div className="bg-blue-300 rounded-md p-2">
                        {message.message}
                    </div>
                    <div className="w-0 h-0 mt-2
                                        border-l-[10px] border-l-blue-300
                                        border-b-[8px] border-b-transparent
                                        border-t-[8px] border-t-transparent
                                        border-r-[8px] border-r-transparent">
                    </div>
                </div>

                <div className="w-9 h-9">
                    <UserPicture user_id={1} user_img={"/public/user_profile_pictures/YB10jCxFYeYSDe7YX9NhL0vR6i4i25uFo01AITXj.png"} />
                </div>
            </div>
        )
    } return (
        <div className="flex justify-start p-2">
            <div className="w-9 h-9">
                <UserPicture user_id={1} user_img={"/public/user_profile_pictures/YB10jCxFYeYSDe7YX9NhL0vR6i4i25uFo01AITXj.png"} />
            </div>
            <div className="flex gap-0">
                <div className="w-0 h-0 mt-2
                                border-l-[8px] border-l-transparent
                                border-b-[8px] border-b-transparent
                                border-t-[8px] border-t-transparent
                                border-r-[10px] border-r-blue-100">
                </div>
                <div className="bg-blue-100 rounded-md p-2">
                    {message.message}
                </div>

            </div>


        </div>
    )
}
