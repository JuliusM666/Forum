import UserImage from './userPicture'
import Card from '../Components/card'
import moment from 'moment'
import { Link } from '@inertiajs/react'
export default function UserStatistics({ userStatistics }) {
    return (
        <Card name={"User statistics"}>
            <div className="bg-slate-100 px-7 py-4 grid grid-cols-5">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-slate-600">{userStatistics.userCount}</h1>
                    <h1 className="text-sm text-slate-600">Users</h1>
                </div>
                <div className="text-center col-span-2">
                    {/* <h1 className="text-xl font-semibold text-slate-600">0</h1>
                    <h1 className="text-sm text-slate-600">Maximum of logged in users at once</h1> */}
                </div>
                <div className="border-l-2 col-span-2">
                    <div className="ml-4 inline-flex">
                        <div className='h-10 w-10 mr-2 my-auto '>
                            <UserImage user_id={userStatistics.latestUser.id} user_img={userStatistics.latestUser.user_img} />
                        </div>
                        <div className="text-sm max-sm:text-xs text-slate-600 max-md:my-auto">
                            <h1>NEWEST USER</h1>
                            <h1 className='font-semibold hover:opacity-70 max-md:hidden'>
                                <Link preserveState href={route('user.show', userStatistics.latestUser.id)}>{userStatistics.latestUser.name}</Link>
                            </h1>
                            <h1 className='max-md:hidden'>Registered {moment(userStatistics.latestUser.created_at).fromNow()}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
