import Card from '../Components/card'
import { Link } from '@inertiajs/react'
export default function ActiveUsers({ activeUsers }) {
    return (
        <Card name={"Active Users"} SubName={<SubName activeUsers={activeUsers} />}>
            <div className="bg-slate-100 px-7 py-4 text-sm text-slate-600 font-semibold justify-items-center items-center flex flex-wrap">


                {
                    Object.keys(activeUsers).map(function (keyName, keyIndex) {
                        return (
                            <Link className='flex w-fit' href={route('user.show', activeUsers[keyName].id)} preserveState key={keyIndex}>
                                <h1 className='hover:opacity-70 whitespace-nowrap'>{activeUsers[keyName].name}</h1>
                                <h1> {keyIndex + 1 < Object.keys(activeUsers).length ? "," : ""}&nbsp;</h1>
                            </Link>
                        )
                    })
                }

            </div>
        </Card>
    )

}

function SubName({ activeUsers }) {

    return (
        <h1 className='text-sm text-slate-100'>{Object.keys(activeUsers).length} users</h1>
    )
}