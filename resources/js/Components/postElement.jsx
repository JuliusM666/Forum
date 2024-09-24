import moment from "moment"
import { Link } from "@inertiajs/react"
export default function PostElement({ post, theme, topic }) {
     const pages = []
     for (let i = 1; i < 5; i++) {

          if (post.pages.last_page == i) {
               break
          }
          pages.push(<PostPaginationPage key={i} href={post.pages.links[i].url}>{i}</PostPaginationPage>)
     }
     return (
          <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600">
               <div className="grid grid-cols-4 items-center max-sm:grid-cols-3">
                    <div className="inline-flex items-center ml-7 col-span-2 py-5">

                         <div className="text-sm grid grid-cols-1">
                              <div className="flex max-md:grid grid-cols-1 gap-2">
                                   <Link className="hover:opacity-70 truncate" preserveState href={route('post', [topic, theme, post])}>{post.title}</Link>
                                   <nav>
                                        <ul className="flex gap-1">
                                             {pages}
                                             <PostPaginationPage href={post.pages.last_page_url}>
                                                  <h1>{post.pages.last_page}</h1><i className="fa fa-caret-right" />
                                             </PostPaginationPage>
                                        </ul>
                                   </nav>
                              </div>

                              <span>Created by <Link className="font-semibold" preserveState href={route('user.show', post.user.id)}>{post.user.name} </Link>{moment(post.created_at).fromNow()}</span>
                         </div>
                    </div>
                    <div className="text-right mr-10">
                         <h1 className="text-sm font-semibold"> answers</h1>
                         <h1 className="text-sm"> {post.replies_count}</h1>
                    </div>
                    <div className="text-sm text-left mr-7 visible max-sm:hidden">
                         {post.reply != null &&
                              <>
                                   <Link preserveState href={route('user.show', post.reply.user.id)} className="font-semibold text-sm">{post.reply.user.name}</Link>
                                   <h1>{moment(post.reply.created_at).fromNow()}</h1>
                              </>
                         }
                    </div>

               </div>
          </div>
     )
}


function PostPaginationPage({ children, href }) {
     return (
          <li >
               <Link href={href} className="bg-slate-300 flex  gap-1 items-baseline text-slate-400 px-2 py-0.5 rounded-md hover:opacity-70" preserveState>{children}</Link>
          </li>
     )
}