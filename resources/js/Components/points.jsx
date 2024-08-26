import { useForm } from '@inertiajs/react'
import { usePage } from "@inertiajs/react"
export default function Points({points,user}){
    const color=user.points.length>0?'text-green-600':'text-green-100'
    const { auth } = usePage().props
    const{processing,post,reset}=useForm({
        user:user
    })
    function submit(e) {
        e.preventDefault()
        post('/vote', {
            preserveScroll: true,
            onSuccess: () =>{ reset()}
            
        })
    }
    return(
        <form onSubmit={submit}>
        <button disabled={processing||auth.user==null}>
        <span className={`text-xs  flex gap-1 ${color} items-center`}><i className="fa-solid fa-circle-plus"/>{points}</span>
        </button>
        </form>
    )
}