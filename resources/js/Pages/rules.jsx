import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
import Card from '../Components/card'
export default function Rules({ breadcrumbs }) {
    return (
        <Layout breadcrumbs={breadcrumbs}>



            <Card name={"Rules"}>
                <div className='bg-slate-100 p-4 text-slate-600'>
                    Have Fun...
                </div>
            </Card>





        </Layout>
    )
}
