import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import Followers from '../Components/followers'
import UserPicture from '../Components/userImage'
import AddNewPostButton from '../Components/addNewPostButton'
import PageCard from '../Components/pageCard'
import Comment from '../Components/comment'
import moment from 'moment'
import { useState,useContext} from 'react'
import { UserContext } from '../Components/UserContext'
export default function Post({breadcrumbs,user,post}){
    const [activeReply,setActiveReply]=useState(null)
    
    return(
        <Layout breadcrumbs={breadcrumbs} user={user}>
            <div className='grid md:grid-cols-4 sm:grid-cols-1' name="content_block">
                <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
                <div className='grid grid-cols-1 items-center bg-slate-100 rounded-lg shadow-md mb-3'>
                        <div className='p-4'>
                            <h1 className='text-2xl font-semibold max-sm:ml-2'>{post.title}</h1>
                           
                        </div>
                        <div className='flex items-center justify-between py-5 pr-2 pl-4 border border-t-slate-200'>
                            <div className='flex justify-start items-center'>
                                <div className='w-10 h-10'>
                                <UserPicture/>
                                </div>
                                <div className='text-slate-600 text-md ml-2'>
                                    <h1 className='font-semibold'>Created by {post.user.name}</h1>
                                    <h1>{moment(post.created_at).fromNow()}</h1>
                                </div>
                            </div>
                            <Followers/>
                        </div>
                        
                    </div>
                    <div className='flex justify-end gap-2 max-md:grid grid-cols-1'>
                        <AddNewPostButton/>
                        
                    </div>
                    <PageCard filter={false} rounded={"rounded-lg"}>
                        <div className='my-2'>
                        
                        <UserContext.Provider value={{"user":user,"post":post}}>
                        <Comment isPost={true} key={0} activeReply={activeReply} setActiveReply={setActiveReply} id={"1"} reply={post}></Comment>
                        {Object.keys(post.replies).map(function(keyName, keyIndex) {
                            return(
                                <Comment key={keyIndex+1} activeReply={activeReply} setActiveReply={setActiveReply} id={keyName+"1"} reply={post.replies[keyName]}></Comment>
                            )
                        })}
                        </UserContext.Provider>
                        
                        </div>
                    </PageCard>

                    
                    
                    
                    
                </div>
                <SideBar/>
            </div>
        </Layout>
    )
}