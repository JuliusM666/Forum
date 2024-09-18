import { Link } from "@inertiajs/react"
export default function UserPicture({ user_id = 1, user_img }) {
    return (
        <Link preserveState preserveScroll href={route('user.show', { user: user_id })}>
            <img className="w-full h-full rounded-full border border-black" src={user_img} alt="user image" />
        </Link>
    )
}
