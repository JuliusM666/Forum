import UserPicture from "./userPicture"
import Points from "../Components/points"
import moment from "moment"
import { SettingsContext } from "./Context/settingsContext"
import { useContext } from "react"
export default function UserBanner({user=null,userProfile}){
    const {setIsShowSettings}=useContext(SettingsContext)
    return(
    
        
    <div className="relative">
    <div className="">
    <img className="rounded-t-lg h-48 w-full border-black" src={userProfile.banner_img} alt="user banner" />
    </div>
    
            <div className="absolute flex top-2/4 max-xl:top-1/4 gap-5">
            <div className=" w-28 h-28  p-2  max-lg:top-1/4">
            <UserPicture user={userProfile}/>
            </div>
            <div className="bg-slate-700 h-fit p-2 px-5">
                <h1 className="text-xl text-slate-200 font-thin">{userProfile.name}</h1>
            </div>
            </div>
          
        

        <div className=" bg-blue-300 pl-40 grid grid-cols-6 items-center p-2 text-md max-xl:grid-cols-4 max-xl:pl-0">
            <div className="border-blue-200 border-r-2 grid justify-center">
                <h1 className="text-slate-100 font-semibold">Messages</h1>
                <h1 className="text-slate-200">{userProfile.replies_count+userProfile.posts_count}</h1>
            </div>
            <div className="border-blue-200 border-r-2 grid justify-center text-center">
                <h1 className="text-slate-100 font-semibold">Registered</h1>
                <h1 className="text-slate-200">{moment(userProfile.created_at).fromNow()}</h1>
            </div>
            <div className="border-blue-200 border-r-2 grid justify-center text-center">
                <h1 className="text-slate-100 font-semibold">Last visited</h1>
                <h1 className="text-slate-200">{moment(userProfile.last_seen).fromNow()}</h1>
            </div>
            <div className="grid justify-center">
                <h1 className="text-slate-100 font-semibold ">Points</h1>
                <h1 className="text-slate-200"><Points points={userProfile.points_count} user={userProfile}/></h1>
            </div>
            <div className="text-slate-700 max-xl:hover:text-4xl hover:text-2xl pr-2 text-xl max-xl:right-1 max-xl:text-3xl col-span-2 max-lg: flex justify-end max-xl:absolute max-xl:top-2/4">
            {user!=null && user.id==userProfile.id &&
            <i onClick={()=>{setIsShowSettings(true),window.scrollTo(0,0)}} className="fa-solid fa-gear"/>
            }
            </div>
        </div>
    </div>
    
    )
}