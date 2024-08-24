import useComponentVisible from "./Hooks/useComponentVisible";
import { useState } from "react";
export default function PageInput({children,pagination}){
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const [page,setPage]=useState(pagination.current_page)
    return(
        <div ref={ref}>
            <div onClick={()=>setIsComponentVisible(!isComponentVisible)} className="hover:cursor-pointer">
            {children} 
            </div>
        {isComponentVisible && (
            <div className="absolute">
                <div className="border border-slate-400 shadow-2xl bg-white rounded-md mt-2">
                    <form action="" onSubmit={(e)=>e.preventDefault()}>
                        <div className="grid grid-cols-1 p-4 gap-2">
                        <input min={1} max={pagination.last_page} value={page} onChange={(e)=>setPage(e.target.value)} className="w-44 rounded-lg" type="number" />
                        <a href={pagination.first_page_url.replace(/[?]page=[0-9]+/g,'?page='+(page))} className="bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center w-full font-semibold max-h-fit text-slate-200">Show</a>
                        </div>
                        
                    </form>
                </div>
            </div>
        )}
       
       </div>
    )
}