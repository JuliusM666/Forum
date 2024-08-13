import Layout from '../Layouts/layout'
import Button from '../Components/button'
import Topics from '../Components/topics'
import ActiveUsers from '../Components/activeUsers'
import UserStatistics from '../Components/userStatistics'
import SideBar from '../Components/sidebar'
export default function Main(){
    return(
        <Layout>
            <div className='grid md:grid-cols-4 sm:grid-cols-1' name="content_block">
                <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
                    <div className='grid md:grid-cols-2 sm:grid-cols-1 items-center'>
                        <div>
                            <h1 className='text-2xl font-semibold max-sm:ml-2'>Forum</h1>
                        </div>
                        <div className='flex md:justify-end max-sm:justify-center max-sm:m-1'>
                            <button className='bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center md:max-w-fit max-sm:w-full  font-semibold max-h-fit text-slate-200'><i className='fa fa-plus-circle mr-2'/>New Post</button>
                        </div>
                    </div>
                    
                    <Topics name={"topic 1"}/>
                    <Topics name={"topic 2"}/>
                    <Topics name={"topic 3"}/>
                    <div className=''>
                    <ActiveUsers/>
                    <UserStatistics/>
                    </div>
                    
                </div>
                <SideBar/>
            </div>
            
            
        </Layout>
    )
}
