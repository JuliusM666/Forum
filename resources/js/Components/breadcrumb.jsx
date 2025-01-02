import Facebook from '../Components/facebook'
import { Link } from '@inertiajs/react'
export default function Breadcrumb({ breadcrumbs }) {
    return (

        <nav className="bg-slate-100 rounded-xl p-2 mt-2 h-fit">
            <div className="flex justify-between items-center ">

                <ul className="flex flex-wrap items-center max-w-[90vw] gap-2">

                    {Object.keys(breadcrumbs).map(function (keyName, keyIndex) {

                        return (
                            <li key={keyIndex} className="text-xs text-slate-400 font-semibold mx-2 overflow-hidden max-w-[20vw]">
                                <Link preserveState preserveScroll className=" hover:bg-white  hover:opacity-25 items-baseline flex gap-1" href={breadcrumbs[keyName].route}>
                                    <h1 className="truncate" >{breadcrumbs[keyName].name} </h1>
                                    <h1><i className="fa fa-solid fa-angle-right" /></h1> </Link>
                            </li>
                        )
                    })}


                </ul>


                <ul className="inline-flex items-center max-sm:hidden">
                    <li className="text-xs text-slate-400 font-semibold mx-4">
                        <Link preserveScroll preserveState href={route('activity')} className="hover:bg-white hover:opacity-25"><i className="fa fa-solid fa-newspaper" /> All activity</Link>
                    </li>
                    <li>
                        <Facebook />
                    </li>
                </ul>


            </div>

        </nav>
    )
}