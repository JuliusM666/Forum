import Layout from '../Layouts/layout'
import Followers from '../Components/followers'
import UserPicture from '../Components/userPicture'
import AddNewPostButton from '../Components/addNewPostButton'
import PageCard from '../Components/pageCard'
import AddNewCommentButton from '../Components/addNewCommentButton'
import Reply from '../Components/reply'
import Comment from '../Components/comment'
import moment from 'moment'
import { useState } from 'react'
import { PostContext } from '../Components/Context/postContext'
export default function Post({ breadcrumbs, post, topics, topic, theme, pagination, isFollowing, reply = null }) {
    const [activeReply, setActiveReply] = useState(null)
    const [activeEdit, setActiveEdit] = useState(null)
    const routeData = [topic.id, theme.id, post.id]
    return (
        <Layout breadcrumbs={breadcrumbs}>

            <div className='grid grid-cols-1 items-center bg-slate-100 rounded-lg shadow-md mb-3'>
                <div className='p-4'>
                    <h1 className='text-2xl font-semibold max-sm:ml-2 truncate'>{post.title}</h1>

                </div>
                <div className='flex items-center justify-between py-5 pr-2 pl-4 border border-t-slate-200'>
                    <div className='flex justify-start items-center'>
                        <div className='w-10 h-10'>
                            <UserPicture user_id={post.user.id} user_img={post.user.user_img} />
                        </div>
                        <div className='text-slate-600 text-md ml-2'>
                            <h1 className='font-semibold'>Created by {post.user.name}</h1>
                            <h1>{moment(post.created_at).fromNow()}</h1>
                        </div>
                    </div>
                    <Followers item={post} type={"post"} isFollowing={isFollowing} />
                </div>

            </div>
            <div className='flex justify-end gap-2 max-md:grid grid-cols-1 mb-2'>
                <AddNewPostButton topics={topics} defaultID={post.theme_id} />
                {reply == null &&
                    <AddNewCommentButton handleClick={() => { setActiveReply('main_reply'); document.getElementById('main_reply').scrollIntoView() }}>
                        <i className='fa-regular fa-comments mr-2' />New comment
                    </AddNewCommentButton>
                }


            </div>
            <PageCard rounded={"rounded-lg"} pagination={pagination}>
                <div className='my-2'>

                    <PostContext.Provider value={{ "post_id": post.id }}>
                        {pagination.current_page == 1 && reply == null &&
                            <Comment key={0} routeData={routeData} isPost={true} isMain={true} activeReply={activeReply} setActiveReply={setActiveReply} edit={{ activeEdit: activeEdit, setActiveEdit: setActiveEdit }} id={"1"} reply={post}></Comment>
                        }
                        {pagination.current_page == 1 && reply != null &&

                            <Comment key={0} routeData={routeData} edit={{ activeEdit: activeEdit, setActiveEdit: setActiveEdit }} isPost={false} isMain={true} activeReply={activeReply} setActiveReply={setActiveReply} id={"1"} reply={reply}></Comment>

                        }

                        {pagination.data.map((reply, index) => {
                            return (
                                <Comment routeData={routeData} edit={{ activeEdit: activeEdit, setActiveEdit: setActiveEdit }} key={index + 1} activeReply={activeReply} setActiveReply={setActiveReply} id={index + "1"} reply={reply}></Comment>
                            )
                        })}
                        <div id="main_reply">
                            {activeReply == "main_reply" &&

                                <Reply to={post.user} replyId={null} setActiveReply={setActiveReply} />

                            }
                        </div>
                    </PostContext.Provider>

                </div>
            </PageCard>

        </Layout>
    )
}