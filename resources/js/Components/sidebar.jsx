import JoinTheCommunity from '../Components/joinTheCommunity'
import NewHotTopics from '../Components/newHotTopics'
import PopularUsers from '../Components/popularUsers'
export default function Sidebar(){
    return(
        <div className='md:ml-4 max-sm:mx-4  sm:col-span-2 md:col-span-1'>
        <JoinTheCommunity/>
        <NewHotTopics title={"New topics"}/>
        <NewHotTopics title={"Hot topics"}/>
        <PopularUsers/>
        </div>
    )
}