import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import Card from '../Components/card'
import { Head } from '@inertiajs/react'
export default function Rules({ breadcrumbs }) {
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="rules" />


            <Card name={"Rules"}>
                <div className='bg-slate-100 p-4 text-slate-600'>
                    Have Fun...
                </div>
            </Card>





        </Layout>
    )
}
