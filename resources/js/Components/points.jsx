import { usePage, Link } from "@inertiajs/react"
export default function Points({ points, user_id }) {
    const { auth } = usePage().props
    const color = auth.user == null || auth.votes[user_id] ? 'text-green-600' : 'text-green-200'
    return (

        <Link as="button" disabled={auth.user == null || auth.user.id == user_id} type="button" href="/vote" method="post" preserveState preserveScroll data={{ userID: user_id }}>
            <span className={`text-xs hover:opacity-70  flex gap-1 ${color} items-center`}><i className="fa-solid fa-circle-plus" />{points}</span>
        </Link>


    )
}