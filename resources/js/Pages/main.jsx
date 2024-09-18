import Layout from '../Layouts/layout'
import Topics from '../Components/topics'
import ActiveUsers from '../Components/activeUsers'
import UserStatistics from '../Components/userStatistics'
import AddNewPostButton from '../Components/addNewPostButton'
export default function Main({ breadcrumbs, token, topics, isPasswordResetEmail }) {
    return (
        <Layout breadcrumbs={breadcrumbs} token={token} isPasswordResetEmail={isPasswordResetEmail}>


            <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
                <div className='grid md:grid-cols-2 sm:grid-cols-1 items-center'>
                    <div>
                        <h1 className='text-2xl font-semibold max-sm:ml-2'>Forum</h1>
                    </div>
                    <AddNewPostButton topics={topics} />
                </div>
                {
                    Object.keys(topics).map(function (keyName, keyIndex) {
                        return (
                            <Topics key={keyIndex} topic={topics[keyName]} />
                        )
                    })
                }



                <div className=''>
                    <ActiveUsers />
                    <UserStatistics />
                </div>

            </div>




        </Layout>
    )
}
