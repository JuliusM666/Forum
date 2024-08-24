import UserPicture from "./userPicture"
import Points from "../Components/points"
import Reply from "../Components/reply"
import { useState } from "react"
import moment from "moment"
export default function Comment({id,routeData,isPost=false,replyLevel=0,activeReply,setActiveReply,reply}){
    const [showReplies,setShowReplies]=useState(false)
    const bgColors=["#93c5fd","#bfdbfe","#dbeafe"]
    function loadReplies(){
        if(replyLevel<2){
            setShowReplies(!showReplies)
        }
        else if(reply.replies.length>0){
            window.location.href=route('reply',[
                routeData.topic_id,
                routeData.theme_id,
                routeData.post_id,
                reply.id
            ])
        }
    }
    return(
        <div className="">
        <div className="w-full mt-2 shadow-md">
        <div className="rounded-t-lg p-2 flex text-slate-700 items-center gap-2" style={{backgroundColor:bgColors[replyLevel]}}>
            <div className="w-10 h-10">
                <UserPicture/>
            </div>
            <div>
                <div className="flex items-end gap-2">
                    <h1 className="text-md font-semibold">{reply.user.name}</h1>
                    <Points points={10}/>
                </div>
                <div>
                    <h1 className="text-md">created at {moment(reply.created_at).fromNow()}</h1>
                </div>
            </div>
           
        </div>
        <div className="bg-slate-100 text-slate-700">
            <p className="p-4">{reply.message}</p>
            <div className="border border-t-2 border-slate-200 flex justify-between p-2">
                <button disabled={isPost||!reply.hasOwnProperty('replies')} onClick={()=>loadReplies()} className="flex gap-2 items-center"  ><i className="fa-solid fa-circle-plus"/>
                {reply.hasOwnProperty('replies')?reply.replies.length+" more replies":"no replies"}
                </button>
                <button onClick={()=>setActiveReply(activeReply!=id?id:null)} ><i className="fa-solid fa-reply"/></button>
            </div>
        </div>
        </div>
        {activeReply==id && 
            <Reply name={"User"} points={10} to={reply.user.name} replyId={isPost?null:reply.id} setActiveReply={setActiveReply}/>
        }
        <div className="flex justify-end">
        {showReplies  &&
            <div className="w-11/12">
             {Object.keys(reply.replies).map(function(keyName, keyIndex) {
                            return(
                                <Comment routeData={routeData} replyLevel={replyLevel+1} key={keyIndex+1} activeReply={activeReply} setActiveReply={setActiveReply} id={id+keyName} reply={reply.replies[keyName]}></Comment>
                            )
                        })}
            </div>
        }
        </div>
        </div>
    )
}