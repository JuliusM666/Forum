import { Link } from "@inertiajs/react"
export default function UserPicture({user="1",isLink=true}){
   
    return(
        <Link to={isLink?route('user.show',[user]):"/"}  onClick={ (event) => isLink?"":event.preventDefault() }>
       <img  className="w-full h-full rounded-full border border-black" src={user.user_img} alt="user image" />
       </Link>
    )
}
