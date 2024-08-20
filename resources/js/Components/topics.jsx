import Card from "../Components/card"
import TurnButton from "../Components/turnButton"
import { useState } from "react"
import moment from "moment"
export default function Topics({turnButton=true,topic}){
    const [isVisible,setIsVisible]=useState(true)
    return(
     <Card route={route('topic',topic)} name={topic.title} ButtonComponent={turnButton && <TurnButton isVisible={isVisible} setIsVisible={setIsVisible}/>}>
        { isVisible &&
        <div className="w-full">
          {Object.keys(topic.themes).map(function(keyName, keyIndex) {
                            return(
                            <Theme key={keyIndex} topic={topic} theme={topic.themes[keyName]}/>
                            )
                        })}
         
        </div>
         }
     </Card>
    )
}


function Theme({theme,topic}){
     return(
          <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600">
               <div className="grid grid-cols-4 items-center">
                    <div className="inline-flex items-center ml-7 col-span-2 py-5">
                         <i className="fa-regular fa-comments mr-5"/>
                         <div className="text-sm">
                              <a className="font-semibold" href={route('theme',[topic,theme])}>{theme.title}</a>
                              <h1>{theme.description}</h1>
                         </div>
                    </div>
                    <div className="text-right mr-10">
                         <h1 className="text-md font-semibold">{theme.posts_count}</h1>
                         <h1 className="text-sm">Posts</h1>
                    </div>
                    <div className="text-sm text-left mr-7">
                         <h1>{theme.posts[0].title.substring(0,15)+"..."}</h1>
                         <span>{theme.posts[0].user.name}, {moment(theme.posts[0].created_at).fromNow()}</span>
                    </div>
                    
               </div>
          </div>
     )
}