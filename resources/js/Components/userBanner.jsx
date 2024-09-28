import UserPicture from "./userPicture"
import Points from "../Components/points"
import moment from "moment"
import { ModalContext } from "./Context/modalContext"
import { useContext } from "react"
import { usePage } from "@inertiajs/react"
export default function UserBanner({ user }) {
    const { auth } = usePage().props
    const { setIsShowSettings } = useContext(ModalContext)
    return (


        <div className="relative">
            <div className="">
                <img className="rounded-t-lg h-48 w-full border-black" src={user.banner_img} alt="user banner" />
            </div>

            <div className="absolute flex top-2/4 max-xl:top-1/4 gap-5">
                <div className=" w-28 h-28  p-2  max-lg:top-1/4">
                    <UserPicture user_id={user.id} user_img={user.user_img} />
                </div>
                <div className="bg-slate-700 h-fit p-2 px-5">
                    <h1 className="text-xl text-slate-200 font-thin">{user.name}</h1>
                </div>
            </div>



            <div className=" bg-blue-300 pl-40 grid grid-cols-6 items-center p-2 text-md max-xl:grid-cols-4 max-xl:pl-0">
                <div className="border-blue-200 border-r-2 grid justify-center">
                    <h1 className="text-slate-100 font-semibold">Messages</h1>
                    <h1 className="text-slate-200 whitespace-nowrap max-sm:text-xs">{user.replies_count + user.posts_count}</h1>
                </div>
                <div className="border-blue-200 border-r-2 grid justify-center text-center">
                    <h1 className="text-slate-100 font-semibold">Registered</h1>
                    <h1 className="text-slate-200 whitespace-nowrap max-sm:text-xs">{moment(user.created_at).fromNow()}</h1>
                </div>
                <div className="border-blue-200 border-r-2 grid justify-center text-center">
                    <h1 className="text-slate-100 font-semibold">Last visited</h1>
                    <h1 className="text-slate-200 whitespace-nowrap max-sm:text-xs">{moment(user.last_seen).fromNow()}</h1>
                </div>
                <div className="grid justify-center">
                    <h1 className="text-slate-100 font-semibold ">Points</h1>
                    <h1 className="text-slate-200 whitespace-nowrap max-sm:text-xs"><Points points={user.points_count} user_id={user.id} /></h1>
                </div>
                <div className="text-slate-700 max-xl:hover:text-4xl hover:text-2xl pr-2 text-xl max-xl:right-1 max-xl:text-3xl col-span-2 max-lg: flex justify-end max-xl:absolute max-xl:top-2/4">
                    {auth.user != null && user.id == auth.user.id &&
                        <button onClick={() => { setIsShowSettings(true), window.scrollTo(0, 0) }}>
                            <i className="fa-solid fa-gear " />
                        </button>

                    }
                </div>
            </div>
        </div>

    )
}