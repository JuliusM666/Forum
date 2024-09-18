import JoinTheCommunity from '../Components/joinTheCommunity'
import NewHotTopics from '../Components/newHotTopics'
import PopularUsers from '../Components/popularUsers'
import { usePage } from "@inertiajs/react"
export default function SideBar({ handleLoginClick, handleRegisterClick }) {
    const { sidebar } = usePage().props
    return (
        <div className='lg:ml-4 max-lg:mx-4  sm:col-span-2 md:col-span-1'>
            <JoinTheCommunity handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
            <NewHotTopics title={"New posts"} data={sidebar.newPosts} />
            <NewHotTopics title={"Popular posts"} data={sidebar.popularPosts} />
            <PopularUsers data={sidebar.popularUsers} />
        </div>
    )
}