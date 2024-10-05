import React, { useState } from 'react';
export default function ToolTip({ children, message }) {
    const [isShown, setIsShown] = useState(false);
    return (
        <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            {children}

            {isShown && (

                <div className="absolute ">
                    <div className="w-0 h-0 ml-3
                                    border-l-[5px] border-l-transparent
                                    border-b-[5px] border-b-black
                                    border-r-[5px] border-r-transparent">
                    </div>
                    <div className='px-2 py-1 bg-black text-white shadow-2xl z-10 rounded-md'>
                        {message}
                    </div>
                </div>

            )}
        </div>
    )
}