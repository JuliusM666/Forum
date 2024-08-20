import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import UserBanner from '../Components/userBanner'
import Card from '../Components/card'
export default function User({breadcrumbs,user}){
    return(
        <Layout breadcrumbs={breadcrumbs} user={user}>
            <div className='grid md:grid-cols-4 sm:grid-cols-1' name="content_block">
            <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
            <UserBanner user={user}/>
            <Card name={"Recent activity"}></Card>
            </div>
                <SideBar/>
            </div>
        </Layout>
    )
}