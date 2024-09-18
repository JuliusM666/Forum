import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react'
export default function LinkComponent({ children, links = null, href, page }) {
    const [isShow, setIsShow] = useState(false);
    const activeClass = "text-slate-100 bg-slate-400 cursor-pointer font-semibold rounded-xl px-2 py-1  text-center hover:opacity-70"
    const defaultClass = "text-slate-400 cursor-pointer font-semibold rounded-xl px-2 py-1  text-center hover:bg-slate-400 hover:text-slate-100"
    const { component } = usePage()
    if (links != null) {


        return (

            <div onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>
                <button className={component === page ? activeClass : defaultClass}>{children} <i className="fa fa-caret-down" /></button>
                {isShow && (
                    <div className="absolute ml-3">
                        <div className="border border-slate-400 shadow-2xl bg-white rounded-md mt-2">
                            <ul className="text-sm p-1   text-slate-400">
                                {Object.keys(links).map(function (link, i) {
                                    return (
                                        <li key={i} className='w-40'>
                                            <Link href={links[link]} className="block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500" preserveScroll>{link} </Link>

                                        </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                )}

            </div>
        )
    }
    else {
        return (
            <Link href={href} className={component === page ? activeClass : defaultClass} preserveScroll >{children}</Link>
        )
    }
}