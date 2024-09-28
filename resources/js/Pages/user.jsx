import Layout from '../Layouts/layout'
import UserBanner from '../Components/userBanner'
import Card from '../Components/card'
import PageCard from '../Components/pageCard'
import UserPicture from '../Components/userPicture'
import moment from 'moment'
import { Head, usePage, Link } from '@inertiajs/react'
export default function User({ breadcrumbs, userProfile, pagination }) {
    const { auth } = usePage().props
    return (

        <Layout breadcrumbs={breadcrumbs}>
            <Head title={userProfile.name} />

            <UserBanner user={userProfile} />
            <Card name={"Recent activity"}>
                <PageCard pagination={pagination} filter={false} rounded={""}>
                    <div className='bg-slate-100 rounded-b-lg p-2'>
                        {pagination.data.map((message, index) => {
                            return (<Message key={index} message={message} user={userProfile} />)
                        })}

                    </div>
                </PageCard>
            </Card>

        </Layout>
    )
}

function Message({ message, user }) {
    return (
        <div className='border-slate-300 border-t-2 p-2 '>
            <div className="rounded-t-lg flex text-slate-700 items-center gap-2">
                <div className="w-10 h-10 max-xl:hidden">
                    <UserPicture user_id={user.id} user_img={user.user_img} />
                </div>
                <div className='grid grid-cols-1  w-full'>
                    <div className='flex items-center max-lg:grid grid-cols-1 gap-2'>
                        <Link href={route('post', [message.topic, message.theme, message.post])}><div className='flex px-4 justify-between gap-1 max-lg:rounded-md items-center bg-blue-300 hover:bg-blue-200 p-2 text-white rounded-full'>
                            {message.title}
                            {message.is_post == false && <i className="text-end fa-regular fa-comment" />}
                            {message.is_post && <i className="text-end fa-regular fa-comments" />}

                        </div></Link>
                        <div className='max-lg:p-2'>
                            <Link className='font-semibold' href={route('user.show', { user: user.id })}>{user.name}</Link> posted in <Link className='font-semibold' href={route('theme', [message.topic, message.theme])}>{message.theme.title}</Link>
                        </div>

                    </div>
                    {message.is_post == false &&
                        <div className='lg:px-4 px-2'>
                            Reply to: <Link className='font-semibold' href={route('user.show', [message.reply_to])}>{message.reply_to.name}</Link>
                        </div>
                    }

                </div>

            </div>

            <div className="text-slate-700 xl:px-16 lg:px-4 px-2">
                <div className='py-4 break-all' id="dangerouslySetInnerHTML" dangerouslySetInnerHTML={{ __html: message.message }}></div>
                <div className='flex text-justify items-center gap-4'>
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

