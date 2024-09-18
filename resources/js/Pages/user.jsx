import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import UserBanner from '../Components/userBanner'
import Card from '../Components/card'
import PageCard from '../Components/pageCard'
import UserPicture from '../Components/userPicture'
import moment from 'moment'
import { Head } from '@inertiajs/react'
import { usePage } from "@inertiajs/react"
export default function User({ breadcrumbs, userProfile, pagination }) {
    const { auth } = usePage().props
    return (

        <Layout breadcrumbs={breadcrumbs}>
            <Head title={userProfile.name} />
            <div className='grid md:grid-cols-4 sm:grid-cols-1' name="content_block">
                <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
                    <UserBanner userProfile={userProfile} user={auth.user} />
                    <Card name={"Recent activity"}>
                        <PageCard pagination={pagination} filter={false} rounded={""}>
                            <div className='bg-slate-100 rounded-b-lg p-2'>
                                {pagination.data.map((message, index) => {
                                    return (<Message key={index} message={message} user={userProfile} />)
                                })}

                            </div>
                        </PageCard>
                    </Card>
                </div>
                <SideBar />
            </div>
        </Layout>
    )
}

function Message({ message, user }) {
    return (
        <div className='border-slate-300 border-t-2 p-2 '>
            <div className="rounded-t-lg flex text-slate-700 items-center gap-2">
                <div className="w-10 h-10 max-xl:hidden">
                    <UserPicture user={user} />
                </div>
                <div className='grid grid-cols-1'>
                    <div className='flex items-center max-lg:grid grid-cols-1 gap-2'>
                        <a href={route('post', [message.topic, message.theme, message.post])}><div className='flex  gap-1 max-lg:rounded-md items-center bg-blue-300 hover:bg-blue-200 p-2 text-white rounded-full'>
                            {message.title}
                            {message.is_post == false && <i className="fa-regular fa-comment" />}
                            {message.is_post && <i className="fa-regular fa-comments" />}

                        </div></a>
                        <div className='max-lg:p-2'>
                            <a href={route('user.show', [user])}>{user.name}</a> posted in <a href={route('theme', [message.topic, message.theme])}>{message.theme.title}</a>
                        </div>

                    </div>
                    {message.is_post == false &&
                        <div className='max-xl:px-2'>
                            Reply to: <a href={route('user.show', [message.reply_to])}>{message.reply_to.name}</a>
                        </div>
                    }

                </div>

            </div>

            <div className="text-slate-700 px-12 max-xl:px-2">
                <p className="py-4">{message.message}</p>

                <div className='flex justify-start items-center gap-4'>
                    <span><i className="fa-regular fa-clock" /> {moment(message.created_at).fromNow()}</span>
                    {message.replies.replies_count > 0 &&
                        <a href={message.is_post ? route('post', [message.topic, message.theme, message.post]) : route('reply', [message.topic, message.theme, message.post, message.id])

                        }><span><i className="fa-solid fa-comment" /> {message.replies.replies_count} </span></a>
                    }
                </div>
            </div>


        </div>
    )
}
