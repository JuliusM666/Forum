import UserImage from './userPicture'
import Card from '../Components/card'
export default function UserStatistics() {
    return (
        <Card name={"User statistics"}>
            <div className="bg-slate-100 px-7 py-4 grid grid-cols-4">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-slate-600">113.255</h1>
                    <h1 className="text-sm text-slate-600">Users</h1>
                </div>
                <div className="text-center col-span-2">
                    <h1 className="text-xl font-semibold text-slate-600">3.258</h1>
                    <h1 className="text-sm text-slate-600">Maximum of logged in users at once</h1>
                </div>
                <div className="border-l-2 ">
                    <div className="ml-4 inline-flex">
                        <div className='h-10 w-10 mr-2'>
                            <UserImage user_id={1} />
                        </div>
                        <div className="text-sm max-sm:text-xs text-slate-600 ">
                            <h1>NEWEST USER</h1>
                            <h1>Cakys</h1>
                            <h1>Registered 2h ago</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
