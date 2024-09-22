import Card from '../Components/card'
import { useState } from 'react'
import UserImage from './userPicture'
import Button from '../Components/button'
import Points from '../Components/points'
import { Link } from '@inertiajs/react'
export default function PopularUsers({ data }) {
    const [active, setActive] = useState("week");
    return (
        <Card name={"Popular users"}>
            <div className='bg-slate-100 px-2 '>
                <div className='grid grid-cols-4 text-slate-500 text-md text-center'>
                    <button className='whitespace-nowrap lg:max-xl:text-xs' onClick={() => setActive("week")} style={{ borderBottom: active == "week" ? "solid" : "" }}>
                        Week
                    </button>
                    <button className='whitespace-nowrap lg:max-xl:text-xs' onClick={() => setActive("month")} style={{ borderBottom: active == "month" ? "solid" : "" }}>
                        Month
                    </button>
                    <button className='whitespace-nowrap lg:max-xl:text-xs' onClick={() => setActive("year")} style={{ borderBottom: active == "year" ? "solid" : "" }}>
                        Year
                    </button>
                    <button className='whitespace-nowrap lg:max-xl:text-xs' onClick={() => setActive("allTime")} style={{ borderBottom: active == "allTime" ? "solid" : "" }}>
                        All time
                    </button>
                </div>
                {
                    Object.keys(data[active]).map(function (keyName, keyIndex) {
                        return (
                            <User key={keyIndex} index={keyIndex + 1} data={data[active][keyName]} />

                        )
                    })
                }

            </div>
        </Card>
    )
}
function User({ data, index }) {
    return (
        <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600 text-sm m-2">
            <div className="grid grid-cols-6 py-2 lg:max-xl:grid-cols-2">
                <div className='flex items-center justify-center text-lg font-semibold'>
                    {index}
                </div>
                <div className='flex justify-center items-center'>
                    <div className='w-8 h-8'>
                        <UserImage user_id={data.id} user_img={data.user_img} />
                    </div>
                </div>
                <div className='col-span-4 text-start lg:max-xl:text-center'>
                    <Link href={route('user.show', { user: data.id })}> <h1 className='text-md  font-semibold text-slate-600'>{data.name}</h1> </Link>

                    <Points user_id={data.id} points={data.points_count} />




                </div>
            </div >
        </div >
    )

}