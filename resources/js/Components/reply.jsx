import UserPicture from "./userPicture"
import Points from "../Components/points"
import TextEditor from "../Components/textEditor"
import AddNewCommentButton from "../Components/addNewCommentButton"
import { useContext } from "react"
import { UserContext } from "./Context/userContext"
import { useForm, usePage, Link } from '@inertiajs/react'
import ValidationError from "../Components/validationError"
export default function Reply({ to, replyId, setActiveReply }) {
    const context = useContext(UserContext);
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        message: '',
        reply_id: replyId,
        post_id: context.post_id,
    })
    function clearForm() {
        clearErrors()
        reset()

    }

    function submit(e) {
        e.preventDefault()
        post('/reply', {
            preserveScroll: true,
            onSuccess: () => { clearForm(), setActiveReply(null) }

        })
    }
    return (
        <div className="w-full mt-2 shadow-md">
            <div className="rounded-t-lg p-2 flex bg-blue-400 border-slate-200 border-b-2 text-slate-700 items-center gap-2" >

                <div className="w-10 h-10">
                    <UserPicture user_id={auth.user.id} user_img={auth.user.user_img} />
                </div>
                <div>
                    <div className="flex items-end gap-2">
                        <Link preserveState href={route('user.show', auth.user.id)} className="text-md font-semibold">{auth.user.name}</Link>
                        <Points points={auth.user.points_count} user_id={auth.user.id} />
                    </div>
                    <div className="flex gap-1">

                        <h1>Reply to:</h1>
                        <Link preserveState href={route('user.show', to.id)} className="text-md font-semibold">{to.name}</Link>


                    </div>
                </div>

            </div>
            <form onSubmit={submit}>
                <div className="p-2">
                    <TextEditor setData={setData} name={"message"} />
                </div>
                <div className="p-2">
                    <ValidationError errors={errors.message} />
                </div>
                <div className="p-2">
                    <AddNewCommentButton disabled={processing}>
                        <i className='fa-regular fa-comments mr-2' />New comment
                    </AddNewCommentButton>
                </div>
            </form>

        </div>
    )
}