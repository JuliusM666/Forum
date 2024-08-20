import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import Button from '../Components/button';
import { useState } from 'react';
export default function MenuModal({isVisible,handleCloseClick}){
    const [menu,setMenu] = useState("")
    return(
        <div style={{visibility: isVisible? "visible":"hidden"}}>
        <Modal> <Card name="Menu" shadow='' ButtonComponent={<CloseButton handleOnClick={handleCloseClick}/>}>
            <div className='bg-slate-100 rounded-b-lg h-96 shadow-inherit'>
                <div className='grid grid-cols-1 items-center p-2 gap-3'>
                    
                        <Button width='w-full'>Login</Button>
                        <Button width='w-full'>Register</Button>
                </div>
                 
                <div className='grid grid-cols-1 items-center p-2 gap-3'>
                { menu=="" &&
                        <>
                        <Link>Forum</Link>
                        
                        <Link handleClick={()=>setMenu("Activity flow")}>
                        <div className='flex justify-between'>
                            Activity flow
                            <i className="fa fa-angle-right"/>
                        </div>
                        </Link>
                        <Link>Ads</Link>
                        <Link>Feedback</Link>
                        <Link>Rules</Link>
                        <Link>Membership</Link>
                        </> }
                { menu=="Activity flow" &&
                        <>
                        
                        <Link handleClick={()=>setMenu("")}>
                        <div className='flex items-center gap-1'>
                        <i className="fa fa-angle-left"/>
                            Activity flow
                            
                        </div>
                        </Link>
                        <Link>All Activity</Link>
                        <Link>Search</Link>
                        
                        </> }
                </div>
                
            </div>
            
            
            
        </Card> </Modal>
        
        </div>
    )
}

function Link({children,handleClick}){
    return(
        <a href="#" onClick={handleClick} className='text-slate-600 text-left mb-2 pl-6'>{children}</a>
    )
}