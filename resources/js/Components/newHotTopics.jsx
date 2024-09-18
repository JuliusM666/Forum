import UserImage from './userPicture'
import Card from '../Components/card'
import ToolTip from './tooltip'
import moment from 'moment'
import { Link } from '@inertiajs/react'
export default function NewHotTopics({ title, data }) {

    return (
        <Card name={title}>
            <div className="w-full">
                {
                    Object.keys(data).map(function (keyName, keyIndex) {
                        return (
                            <NewTopic key={keyIndex} data={data[keyName]} />

                        )
                    })
                }

            </div>
        </Card>
    )
}


function NewTopic({ data }) {
    return (
        <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600 text-sm">
            <div className="grid grid-cols-6 py-2">
                <div className='flex justify-center'>
                    <div className='w-8 h-8'>
                        <UserImage user_img={data.user.user_img} user_id={data.user.id} />
                    </div>
                </div>
                <div className='col-span-4'>
                    <h1 className='hover:opacity-70'><Link href={route('post', { topic: data.theme.topic_id, theme: data.theme.id, post: data.id })}>{data.title}</Link></h1>
                    <h1><Link href={route('user.show', { user: data.user.id })} className='font-semibold'>{data.user.name}</Link></h1>
                    <h1>{moment(data.created_at).fromNow()}</h1>
                </div>
                <div className=''>
                    <ToolTip message={data.replies_count + " answers"}>
                        <div className='bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center'>
                            {data.replies_count}

                        </div>
                    </ToolTip>
                </div>
            </div>
        </div>
    )
}