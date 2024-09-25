import Layout from '../Layouts/layout'
import Topics from '../Components/topics'
import AddNewPostButton from '../Components/addNewPostButton'
export default function Topic({ breadcrumbs, topic, topics }) {
    return (
        <Layout breadcrumbs={breadcrumbs}>


            <div className='grid md:grid-cols-2 sm:grid-cols-1 items-center'>
                <div>
                    <h1 className='text-2xl font-semibold max-sm:ml-2'>{topic.title}</h1>
                </div>
                <AddNewPostButton topics={topics} defaultID={topic.themes[0].id} />
            </div>

            <Topics topic={topic} />







        </Layout>
    )
}
