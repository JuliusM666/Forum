import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import Card from '../Components/card'
export default function Membership({ breadcrumbs }) {
    return (
        <Layout activeLink={"membership"} breadcrumbs={breadcrumbs}>


            <Card name={"Rules"}>
                <div className='bg-slate-100 p-4 text-slate-600'>
                    Membership
                </div>
            </Card>




        </Layout>
    )
}
