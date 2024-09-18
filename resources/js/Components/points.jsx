import { useForm } from '@inertiajs/react'
import { usePage } from "@inertiajs/react"
export default function Points({ points, user_id }) {
    const { auth } = usePage().props
    const color = auth.user == null || auth.votes[user_id] ? 'text-green-600' : 'text-green-200'
    const { processing, post, reset } = useForm({
        userId: user_id
    })
    function submit(e) {
        e.preventDefault()
        post('/vote', {
            preserveScroll: true,
            onSuccess: () => { reset() }

        })
    }
    return (
        <form onSubmit={submit}>
            <button disabled={processing || auth.user == null}>
                <span className={`text-xs hover:opacity-70  flex gap-1 ${color} items-center`}><i className="fa-solid fa-circle-plus" />{points}</span>
            </button>
        </form>
    )
}