import Card from '../Components/card'
import { useState } from 'react'
import UserImage from './userPicture'
import Button from '../Components/button';
import Points from '../Components/points'
export default function PopularUsers(){
    const [active, setActive] = useState(0);
    
    return (
        <Card name={"Popular users"}>
            <div className='bg-slate-100 px-2 '>
            <div className='grid grid-cols-4 text-slate-500 text-md text-center'>
                <button onClick={()=>setActive(0)}  style={{borderBottom: active==0 ? "solid" : ""}}>
                    Week
                </button>
                <button onClick={()=>setActive(1)} style={{borderBottom: active==1 ? "solid" : ""}}>
                    Month
                </button>
                <button onClick={()=>setActive(2)} style={{borderBottom: active==2 ? "solid" : ""}}>   
                    Year
                </button>
                <button onClick={()=>setActive(3)}style={{borderBottom: active==3 ? "solid" : ""}}>
                    All time
                </button>
            </div>
            <User name={"airis"} points={10} number={1}/>
            <User name={"airis"} points={10} number={2}/>
            <User name={"airis"} points={10} number={3}/>
            <div className='flex items-center mt-7 pb-2'><Button width='w-full'>Show more</Button></div>
            
            </div>
        </Card>
    )
}
function User({image="",name,points,number}){
    return(
    <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600 text-sm m-2">
               <div className="grid grid-cols-6 py-2">
                    <div className='flex items-center justify-center text-lg font-semibold'>
                        {number}
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-8 h-8'>
                        <UserImage/>
                        </div>
                    </div>
                    <div  className='cols-span-4'>
                        <h1 className='text-md font-semibold text-slate-600'>{name}</h1>
                        <Points points={points}/>
                             
                        
                    </div>
                    </div>
    </div>
    )

}