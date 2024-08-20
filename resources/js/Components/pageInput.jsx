import { useState } from "react"
import Button from "../Components/button";
export default function PageInput({children}){
    const [isShown, setIsShown] = useState(false);
    return(
        <div>
            <div onClick={() => setIsShown(!isShown)}>
            {children} 
            </div>
        {isShown && (
            <div className="absolute">
                <div className="border border-slate-400 shadow-2xl bg-white rounded-md mt-2">
                    <form action="" onSubmit={(e)=>e.preventDefault()}>
                        <div className="grid grid-cols-1 p-4 gap-2">
                        <input className="w-44 rounded-lg" type="number" />
                        <Button width="w-full">Show</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )}
       
       </div>
    )
}