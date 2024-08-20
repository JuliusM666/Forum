import moment from "moment"
export default function PostElement({post,theme,topic}){
    return(
        <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600">
             <div className="grid grid-cols-4 items-center">
                  <div className="inline-flex items-center ml-7 col-span-2 py-5">
                      
                       <div className="text-sm grid grid-cols-1">
                         <div className="flex max-md:grid grid-cols-1 gap-2">
                              <a className="" href={route('post',[topic,theme,post])}>{post.title.substring(0,15)+"..."}</a>
                              <nav>
                                   <ul className="flex gap-1">
                                   <PostPaginationPage>1</PostPaginationPage>
                                   <PostPaginationPage>2</PostPaginationPage>
                                   <PostPaginationPage>3</PostPaginationPage>
                                   <PostPaginationPage>4</PostPaginationPage>
                                   <PostPaginationPage>55 <i className="fa fa-caret-right"/></PostPaginationPage>

                                   </ul>
                              </nav>
                         </div>
                            
                            <span><a href="">Created by {post.user.name} </a>{ moment(post.created_at).fromNow()}</span>
                       </div>
                  </div>
                  <div className="text-right mr-10">
                       <h1 className="text-sm font-semibold"> answers</h1>
                       <h1 className="text-sm"> {post.replies_count}</h1>
                  </div>
                  <div className="text-sm text-left mr-7">
                       <h1 className="font-semibold text-sm">{post.replies.length==0?"":post.replies[0].user.name}</h1>
                       { post.replies.length==0?"":moment(post.replies[0].created_at).fromNow()}
                  </div>
                  
             </div>
        </div>
    )
}


function PostPaginationPage({children}){
     return(
          <li className="bg-slate-200 text-slate-400 px-2 rounded-lg hover:bg-slate-300">
            <a href="">{children}</a>
          </li>
     )
}