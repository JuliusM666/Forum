import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import Card from '../Components/card'
import { Head } from '@inertiajs/react'
export default function Membership({ breadcrumbs }) {
    return (
        <Layout activeLink={"membership"} breadcrumbs={breadcrumbs}>
            <Head title="membership" />

            <Card name={"Rules"}>
                <div className='bg-slate-100 p-4 text-slate-600'>
                    Membership
                </div>
            </Card>




        </Layout>
    )
}
