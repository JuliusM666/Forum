import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import Card from '../Components/card'
import { Head } from '@inertiajs/react'
export default function Activity({ breadcrumbs }) {
    return (
        <Layout activeLink={"activity"} breadcrumbs={breadcrumbs}>
            <Head title="activity" />

            <Card name={"Activity"}>
                <div className='bg-slate-100 p-4 text-slate-600'>
                    Activity
                </div>
            </Card>




        </Layout>
    )
}
