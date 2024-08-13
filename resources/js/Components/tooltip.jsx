import React, { useState } from 'react';
export default function ToolTip({children,message}){
    const [isShown, setIsShown] = useState(false);
    return(
        <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        {children}
        
        {isShown &&(
           
                <div className="absolute bg-black text-white shadow-2xl z-10 px-2 py-1 rounded-md">
                    {message}
                </div>
           
        )}
        </div>
    )
}