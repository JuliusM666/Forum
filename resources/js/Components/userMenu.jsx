import UserPicture from "./userPicture"
import useComponentVisible from "./Hooks/useComponentVisible";
import { useForm } from "@inertiajs/react"
import { usePage } from "@inertiajs/react"
export default function UserMenu() {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { post } = useForm()
    const { auth } = usePage().props
    return (
        <>
            {auth.user &&
                <div className="flex justify-end max-md:justify-center">
                    <div ref={ref}>
                        <div className="w-10 h-10 mt-2 max-md:w-20 max-md:h-20" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                            <UserPicture isLink={false} user={auth.user} />
                        </div>
                        {isComponentVisible && (
                            <div className="absolute z-10 ">
                                <div className="border border-slate-400 shadow-2xl bg-white rounded-md  text-slate-400">
                                    <ul className="text-slate-600 font-md font-semibold">
                                        <li className="block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                            <a href={route('user.show', auth.user)}>Profile</a>
                                        </li>
                                        <a href="#"> <li onClick={() => post('/logout')} className="text-right block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                            <i className="fa-solid fa-right-from-bracket" /> </li> </a>



                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    )
}