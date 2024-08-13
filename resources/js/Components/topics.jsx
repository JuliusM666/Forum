import Card from "../Components/card"
import TurnButton from "../Components/turnButton"
import { useState } from "react"
export default function Topics({name}){
    const [isVisible,setIsVisible]=useState(true)
    return(
     <Card name={name} ButtonComponent={<TurnButton isVisible={isVisible} setIsVisible={setIsVisible}/>}>
        { isVisible &&
        <div className="w-full">
          <Topic name={"Verslo kūrimas ir vystymas"} description={"Visi teisiniai ir praktiniai klausimai."}
               postCount={40} recent={"Verslas ir gyvenimas"} user={"Darkera"} time={"liepos 22"}
          />
           <Topic name={"Verslo kūrimas ir vystymas"} description={"Visi teisiniai ir praktiniai klausimai."}
               postCount={40} recent={"Verslas ir gyvenimas"} user={"Darkera"} time={"liepos 22"}
          />
           <Topic name={"Verslo kūrimas ir vystymas"} description={"Visi teisiniai ir praktiniai klausimai."}
               postCount={40} recent={"Verslas ir gyvenimas"} user={"Darkera"} time={"liepos 22"}
          />
        </div>
         }
     </Card>
    )
}


function Topic({name,description,postCount,recent,user,time}){
     return(
          <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600">
               <div className="grid grid-cols-4 items-center">
                    <div className="inline-flex items-center ml-7 col-span-2 py-5">
                         <i className="fa-regular fa-comments mr-5"/>
                         <div className="text-sm">
                              <h1 className="font-semibold">{name}</h1>
                              <h1>{description}</h1>
                         </div>
                    </div>
                    <div className="text-right mr-10">
                         <h1 className="text-md font-semibold">{postCount}</h1>
                         <h1 className="text-sm">Posts</h1>
                    </div>
                    <div className="text-sm text-left mr-7">
                         <h1>{recent}</h1>
                         <span>{user}, {time}</span>
                    </div>
                    
               </div>
          </div>
     )
}