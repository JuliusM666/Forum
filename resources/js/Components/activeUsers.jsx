import Card from '../Components/card'
import { useContext } from 'react'
import { UsersOnlineContext } from './Context/usersOnlineContext'
import { Link } from '@inertiajs/react'
export default function ActiveUsers() {
    const { usersOnline } = useContext(UsersOnlineContext)
    let users = []
    let userCount = 0
    let guestCount = 0
    usersOnline.forEach((user, index) => {
        if (user.type == "user") {
            userCount += 1
            if (users.length < 15) {
                for (let i = 1; i < 15; i++) {
                    users.push(
                        <Link className='flex w-fit' href={route('user.show', user.id)} preserveState key={index}>
                            <h1> {users.length > 0 ? "," : ""}&nbsp;</h1>
                            <h1 className='hover:opacity-70 whitespace-nowrap'>{user.name}</h1>

                        </Link>)
                }

            }
        }
        else {
            guestCount += 1
        }
    })
    userCount = 100
    if (userCount > users.length) {
        users.push("...")
    }


    return (
        <Card name={"Active Users"} SubName={<SubName userCount={userCount} guestCount={guestCount} />}>
            <div className="bg-slate-100 px-7 py-4 text-sm text-slate-600 font-semibold justify-items-center items-center flex flex-wrap">
                {users}
            </div>
        </Card >
    )

}

function SubName({ userCount, guestCount }) {

    return (
        <div className="flex gap-2">
            <h1 className='text-sm text-slate-100'>{userCount} users</h1>
            <h1 className='text-sm text-slate-100'>{guestCount} guests</h1>
        </div>

    )
}