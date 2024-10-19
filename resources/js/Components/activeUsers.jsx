import Card from '../Components/card'
import { Link } from '@inertiajs/react'
export default function ActiveUsers({ activeUsers }) {
    let users = []
    for (let keyName = 0; keyName < activeUsers.length; keyName++) {
        if (keyName == 15) {
            users.push("...")
            break
        }
        users.push(
            <Link className='flex w-fit' href={route('user.show', activeUsers[keyName].id)} preserveState key={keyName}>
                <h1 className='hover:opacity-70 whitespace-nowrap'>{activeUsers[keyName].name}</h1>
                <h1> {keyName + 1 < Object.keys(activeUsers).length && keyName + 1 < 15 ? "," : ""}&nbsp;</h1>
            </Link>)
    }
    return (
        <Card name={"Active Users"} SubName={<SubName activeUsers={activeUsers} />}>
            <div className="bg-slate-100 px-7 py-4 text-sm text-slate-600 font-semibold justify-items-center items-center flex flex-wrap">
                {users}
            </div>
        </Card>
    )

}

function SubName({ activeUsers }) {

    return (
        <h1 className='text-sm text-slate-100'>{Object.keys(activeUsers).length} users</h1>
    )
}