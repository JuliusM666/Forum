import Layout from '../Layouts/layout'
import Topics from '../Components/topics'
import ActiveUsers from '../Components/activeUsers'
import UserStatistics from '../Components/userStatistics'
import AddNewPostButton from '../Components/addNewPostButton'
import { Head } from '@inertiajs/react'
export default function Main({ breadcrumbs, token, topics, isPasswordResetEmail, userStatistics }) {
    return (
        <Layout breadcrumbs={breadcrumbs} token={token} isPasswordResetEmail={isPasswordResetEmail}>
            <Head title="home" />


            <div className='grid md:grid-cols-2 sm:grid-cols-1 items-center'>
                <div>
                    <h1 className='text-2xl font-semibold max-sm:ml-2'>Forum</h1>
                </div>
                <AddNewPostButton topics={topics} defaultID={topics[0].themes[0].id} />
            </div>
            {
                Object.keys(topics).map(function (keyName, keyIndex) {
                    return (
                        <Topics key={keyIndex} topic={topics[keyName]} />
                    )
                })
            }




            <ActiveUsers />
            <UserStatistics userStatistics={userStatistics} />






        </Layout>
    )
}
