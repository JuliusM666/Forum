import UserPicture from "../Components/userImage"
import Points from "../Components/points"
export default function UserBanner({user}){
    return(
    <div>
        
    <div >
    <div className="">
    <img className="rounded-t-lg h-48 w-full border-black" src="/user_banners/banner.jpg" alt="user banner" />
    </div>
    <div className="absolute w-28 h-28 top-80 p-2 max-md:top-40 max-lg:top-56">
            <div className="flex gap-5">
            <UserPicture/>
            <div>
            <div className="bg-slate-700 p-2 px-5">
                <h1 className="text-xl text-slate-200 font-thin">{user.name}</h1>
            </div>
            </div>
            </div>
        </div>
        

        <div className=" bg-blue-300 pl-40 grid grid-cols-5 items-center p-2 text-md max-lg:grid-cols-3 max-lg:pl-0">
            <div className="border-blue-200 border-r-2 grid justify-center">
                <h1 className="text-blue-200 font-semibold">Comments</h1>
                <h1 className="text-slate-200">134</h1>
            </div>
            <div className="border-blue-200 border-r-2 grid justify-center">
                <h1 className="text-blue-200 font-semibold">Registered</h1>
                <h1 className="text-slate-200">june 6, 2020</h1>
            </div>
            <div className="grid justify-center">
                <h1 className="text-blue-200 font-semibold ">Points</h1>
                <h1 className="text-slate-200"><Points points={10}/></h1>
            </div>
        </div>
    </div>
    </div>
    )
}