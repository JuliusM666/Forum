import UserPicture from "./userPicture"
import Points from "../Components/points"
import CrudMenu from "./crudMenu"
import { Link, router, useForm, usePage } from "@inertiajs/react"
import Reply from "../Components/reply"
import { useState } from "react"
import moment from "moment"
import TextEditor from "./textEditor"
import AddNewCommentButton from "./addNewCommentButton"
import ValidationError from "./validationError"
export default function Comment({ id, routeData, isPost = false, isMain = false, replyLevel = 0, activeReply, setActiveReply, edit, reply }) {
    const [showReplies, setShowReplies] = useState(false)
    const bgColors = ["#93c5fd", "#bfdbfe", "#dbeafe"]
    const updateRoute = isPost ? route('post.update', reply.id) : route('reply.update', reply.id)
    const { auth } = usePage('auth').props
    function loadReplies() {
        if (replyLevel < 2) {
            setShowReplies(!showReplies)
        }
        else if (reply.replies.length > 0) {
            router.get(route('reply', [...routeData, reply.id]), { preserveState: true })
        }
    }
    const { data, setData, put, processing, errors, clearErrors, reset } = useForm({
        message: reply.message,
    })
    function submit(e) {
        e.preventDefault()
        put(updateRoute, {
            preserveScroll: true,
            onSuccess: () => { clearErrors(), reset(), edit.setActiveEdit(null) }

        })
    }
    return (
        <div className="">
            <div className="w-full mt-2 shadow-md">
                <div className="rounded-t-lg p-2  text-slate-700 flex justify-between" style={{ backgroundColor: bgColors[replyLevel] }}>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10">
                            <UserPicture user_id={reply.user.id} user_img={reply.user.user_img} />
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <Link preserveState href={route('user.show', reply.user.id)} className="text-md font-semibold">{reply.user.name}</Link>
                                <Points points={reply.user.points_count} user_id={reply.user.id} />

                            </div>
                            <div className="flex gap-2 items-baseline">
                                <h1 className="text-md">created at {moment(reply.created_at).fromNow()}</h1>
                                {reply.is_edited == true &&
                                    <h1 className="font-semibold text-sm">(edited)</h1>
                                }
                            </div>
                        </div>
                    </div>

                    {!reply.is_deleted && auth.user != null && auth.user.id == reply.user_id &&
                        <CrudMenu item={reply} isPost={isPost} handleEdit={() => edit.setActiveEdit(edit.activeEdit == id ? null : id)} />
                    }



                </div>
                <div className="bg-slate-100 text-slate-700">
                    {edit.activeEdit != id && <div id="dangerouslySetInnerHTML" className='p-4 break-all' dangerouslySetInnerHTML={{ __html: reply.message }}></div>}
                    {edit.activeEdit == id &&
                        <form onSubmit={submit}>
                            <div className="p-2">
                                <TextEditor setData={setData} name={"message"} data={reply.message} />
                            </div>
                            <div className="p-2">
                                <ValidationError errors={errors.message} />
                            </div>
                            <div className="p-2">
                                <AddNewCommentButton disabled={processing}> Update </AddNewCommentButton >
                            </div>
                        </form>
                    }

                    {!isPost &&
                        <div className="border border-t-2 border-slate-200 flex justify-between p-2">

                            {isMain && <button className="invisible" />}
                            {!isMain &&
                                <button disabled={!reply.hasOwnProperty('replies')} onClick={() => loadReplies()} className="flex gap-2 items-center"  ><i className="fa-solid fa-circle-plus" />
                                    {reply.hasOwnProperty('replies') ? reply.replies.length + " more replies" : "no replies"}
                                </button>
                            }
                            {auth.user &&
                                <button onClick={() => setActiveReply(activeReply != id ? id : null)} ><i className="fa-solid fa-reply" /></button>
                            }



                        </div>
                    }
                </div>
            </div>
            {activeReply == id &&
                <Reply to={reply.user} replyId={isPost ? null : reply.id} setActiveReply={setActiveReply} />
            }
            <div className="flex justify-end">
                {showReplies &&
                    <div className="w-11/12">
                        {Object.keys(reply.replies).map(function (keyName, keyIndex) {
                            return (
                                <Comment routeData={routeData} edit={edit} replyLevel={replyLevel + 1} key={keyIndex + 1} activeReply={activeReply} setActiveReply={setActiveReply} id={id + keyName} reply={reply.replies[keyName]}></Comment>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}