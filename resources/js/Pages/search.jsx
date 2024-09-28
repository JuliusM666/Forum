import Layout from '../Layouts/layout'
import SideBar from '../Components/sidebar'
export default function Search({ breadcrumbs, query }) {
    return (
        <Layout breadcrumbs={breadcrumbs}>


            <div className='grid md:grid-cols-2 sm:grid-cols-1 items-center'>
                <div>
                    <h1 className='text-2xl font-semibold max-sm:ml-2'>Search</h1>
                    <h1>query '{query}' results</h1>
                </div>

            </div>








        </Layout>
    )
}
