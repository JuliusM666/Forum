import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import Card from '../Components/card'
export default function Activity({ breadcrumbs }) {
    return (
        <Layout activeLink={"activity"} breadcrumbs={breadcrumbs}>


            <Card name={"Activity"}>
                <div className='bg-slate-100 p-4 text-slate-600'>
                    Activity
                </div>
            </Card>




        </Layout>
    )
}
