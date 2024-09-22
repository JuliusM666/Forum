import { usePage } from "@inertiajs/react"
import { useState, useEffect } from "react"
export default function Message() {
    const { flash } = usePage().props
    const [show, setShow] = useState(flash.message != null)
    useEffect(() => {
        setShow(flash.message != null)
    }, [flash.message])
    return (
        <>
            {flash.message != null &&
                <div className='w-full mt-1 py-2 px-4 text-slate-100 font-thin rounded-lg bg-blue-300  text-lg flex items-center justify-between'>
                    <h1>{flash.message}</h1>
                    <button className="hover:opacity-70" onClick={() => { setShow(false); flash.message = null }}><i className="fa-solid fa-x" /></button>
                </div>
            }
        </>
    )
}