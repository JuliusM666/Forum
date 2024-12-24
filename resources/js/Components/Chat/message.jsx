import { useContext } from "react"
import { ModalContext } from "../Context/modalContext"
import { usePage, router } from "@inertiajs/react"
import UserPicture from "../userPicture"

export default function Message({ message, setActiveMessage, isActive, setInput, setShowEmoji, setIsEdit, isEdit }) {
    const { setShowConfirm, confirmAction, confirmMessage } = useContext(ModalContext)
    const { auth } = usePage().props
    if (message.sender.id == auth.user.id) {
        return (
            <div className="my-2">
                {isActive &&
                    <div className="flex gap-3 justify-end w-5/6">
                        <button onClick={() => setShowEmoji(true)} className="hover:opacity-70"><i className="fa-solid fa-circle-plus" /></button>
                        {message.deleted_at == null &&
                            <>
                                <button onClick={() => { isEdit ? setIsEdit(false) : (setInput(message.message), setIsEdit(true)) }} className="hover:opacity-70"> <i className="fa-regular fa-pen-to-square" /></button>
                                <button onClick={() => {
                                    confirmMessage.current = "This message will be deleted. Do you want to confirm?", setShowConfirm(true),
                                        confirmAction.current = () => router.delete(route("chats.destroy", message.id))
                                }} className="hover:opacity-70"> <i className="fa-solid fa-circle-xmark" /></button>
                            </>
                        }
                    </div>
                }
                <div className="flex justify-end px-2">
                    <button onClick={() => isActive ? (setActiveMessage(null), setIsEdit(false)) : (setActiveMessage(message.id), setIsEdit(false))} className="flex gap-0 hover:opacity-70 justify-end max-w-72">
                        <div className="bg-blue-300 rounded-md p-2 whitespace-pre-line break-all">
                            {message.message}
                        </div>
                        <div className="w-0 h-0 mt-2
                                        border-l-[10px] border-l-blue-300
                                        border-b-[8px] border-b-transparent
                                        border-t-[8px] border-t-transparent
                                        border-r-[8px] border-r-transparent">
                        </div>
                    </button>

                    <div className="h-9 w-9">
                        <UserPicture user_id={message.sender.id} user_img={message.sender.user_img} />
                    </div>

                </div>
                <div className="text-end text-xs px-1 mr-16">
                    {message.is_edited == true && <h1>edited</h1>}
                </div>
            </div >
        )
    } return (
        <div className="my-2">
            <div className="flex justify-start p-2">
                <div className="h-9 w-9">
                    <UserPicture user_id={message.sender.id} user_img={message.sender.user_img} />
                </div>
                <div className="flex gap-0 justify-start max-w-72">
                    <div className="w-0 h-0 mt-2
                                border-l-[8px] border-l-transparent
                                border-b-[8px] border-b-transparent
                                border-t-[8px] border-t-transparent
                                border-r-[10px] border-r-blue-100">
                    </div>
                    <div className="bg-blue-100 rounded-md p-2 whitespace-pre-line break-all">
                        {message.message}
                    </div>

                </div>


            </div>
            <div className="text-start text-xs px-1 ml-16">
                {message.is_edited == true && <h1>edited</h1>}
            </div>
        </div>

    )
}
