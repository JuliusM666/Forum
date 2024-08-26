import React, { useState } from 'react';
export default function Link({children,dropdown,links,handleClick,href="#",isActive=false}){
    const [isShown, setIsShown] = useState(false);
    const isActiveStyle=isActive?"bg-slate-400 text-white":""
    if(dropdown==true){
        
        
        return(
        
        <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <a href={href}  onClick={handleClick} className={`text-slate-400 cursor-pointer ${isActiveStyle} font-semibold rounded-xl px-2 py-1  text-center hover:bg-slate-400 hover:text-white`}>{children} <i className="fa fa-caret-down"/></a>
            {isShown && (
                <div className="absolute ml-3">
                    <div className="border border-slate-400 shadow-2xl bg-white rounded-md mt-2">
                        <ul className="text-sm p-1   text-slate-400">
                            {Object.keys(links).map(function(link, i){
                                return(
                                <li key={i} className='w-40'>
                                    <a href={links[link]} className="block px-4 rounded-md py-2 hover:bg-slate-200 hover:text-slate-500">
                                        {link}
                                    </a>
                                </li>)})}
                        </ul>
                    </div>
                </div>
            )}
           
           </div>
        )
    }
    else{
        return(
        
            <a href={href} onClick={handleClick} className={`text-slate-400 cursor-pointer ${isActiveStyle} font-semibold rounded-xl px-2 py-1  text-center hover:bg-slate-400 hover:text-white`}>{children}</a>
        )
    }
   }