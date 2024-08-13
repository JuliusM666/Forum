import UserImage from '../Components/userImage'
import Card from '../Components/card'
import ToolTip from './tooltip'
export default function NewHotTopics({title}){
    return(
        <Card name={title}>
            <div className="w-full">
                <NewTopic name={"Robinhood Crypto - 30€ + 30€ uždarbis"} user={"vakarizs"} time={"Sukurta prieš 11 valandų"}
                answerCount={10}/>
                <NewTopic name={"Robinhood Crypto - 30€ + 30€ uždarbis"} user={"vakarizs"} time={"Sukurta prieš 11 valandų"}
                answerCount={10}/>
                <NewTopic name={"Robinhood Crypto - 30€ + 30€ uždarbis"} user={"vakarizs"} time={"Sukurta prieš 11 valandų"}
                answerCount={10}/>
                <NewTopic name={"Robinhood Crypto - 30€ + 30€ uždarbis"} user={"vakarizs"} time={"Sukurta prieš 11 valandų"}
                answerCount={10}/>
            </div>
        </Card>
    )
}


function NewTopic({name,user,time,answerCount,profilePicture=""}){
     return(
          <div className="odd:bg-slate-100 even:bg-slate-200 text-slate-600 text-sm">
               <div className="grid grid-cols-6 py-2">
                    <div className='flex justify-center'>
                        <div className='w-8 h-8'>
                        <UserImage/>
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <h1>{name}</h1>
                        <h1 className='font-semibold'>{user}</h1>
                        <h1>{time}</h1>
                    </div>
                    <div className=''>
                    <ToolTip message={answerCount+" answers"}>
                        <div className='bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center'>
                             {answerCount}
                            
                        </div>
                    </ToolTip>
                    </div>
               </div>
          </div>
     )
}