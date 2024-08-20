import { useState } from "react";
export default function PageFilter({children}){
    
        const [isShown, setIsShown] = useState(false);
    return(
        <div>
            <div onClick={() => setIsShown(!isShown)}>
            {children} 
            </div>
        {isShown && (
            <div className="absolute">
                <div className="border border-slate-400 shadow-2xl bg-white rounded-md mt-2">
                   <ul>
                    <Filter title={"Title"} id={"title"}/>
                    <Filter title={"Creation date"} id={"creationDate"}/>
                    <Filter title={"Views"} id={"views"}/>
                    <Filter title={"Answers"} id={"answers"}/>
                   </ul>
                </div>
            </div>
        )}
       
       </div>
    )
    
}

function Filter({title,id}){
return(
    <li>
                       <span className="flex hover:bg-slate-200 items-center p-1 justify-center text-md gap-2 text-slate-600">
                        <input className="rounded-full text-black focus:ring-0 bg-white " id={id} type="checkbox" />
                        <label className="w-28" htmlFor={id}>{title}</label>
                        </span> 
                    </li>
)
}