import { Link } from "@inertiajs/react"
import { UsersOnlineContext } from "./Context/usersOnlineContext"
import { useContext } from "react"
export default function UserPictureWithStatus({ user_id, user_img }) {
    const { usersOnline } = useContext(UsersOnlineContext)
    return (
        <Link href={route('user.show', { user: user_id })}>
            <div className="w-full h-full relative">
                <img className="h-full w-full object-cover rounded-full border border-black" src={user_img} alt="user image" />
                <div className={`absolute w-1/5 h-1/5 shadow-sm ${usersOnline.find((user) => user.type == "user" && user.id == user_id) ? "shadow-green-600" : "shadow-red-600"} right-0.5 bottom-0 border-white border rounded-full ${usersOnline.find((user) => user.type == "user" && user.id == user_id) ? "bg-green-400" : "bg-red-400"}`} />
            </div>
        </Link>
    )
}
