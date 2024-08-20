import UserPicture from "../Components/userImage"
import { useState } from "react"
import { useForm } from "@inertiajs/react"
export default function UserMenu({user}){
    const [isShow,setIsShow]=useState(false)
    const { post } = useForm()

    return(
        <div className="flex justify-end max-md:justify-center">
        
        <div className="w-10 h-10 mt-2 max-md:w-20 max-md:h-20" onClick={()=>setIsShow(!isShow)}>
            <UserPicture/>
        </div>
        {isShow && (
            <div className="absolute mt-10 max-md:mt-20">
                <div className="border border-slate-400 shadow-2xl bg-white rounded-md mt-2 text-slate-400">
                   <ul className="text-slate-600 font-md font-semibold">
                    <li className="block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                       <a href={route('user.show',user)}>Profile</a> 
                       </li>
                       <a href="#"> <li onClick={()=>post('/logout')} className="text-right block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                    <i className="fa-solid fa-right-from-bracket"/> </li> </a>
                    
                   
                    
                   </ul>
                </div>
            </div>
        )}
        </div>
    )
}