import Layout from '../Layouts/layout'
import PostElement from '@/Components/postElement'
import AddNewPostButton from '../Components/addNewPostButton'
import Followers from '../Components/followers'
import PageCard from '../Components/pageCard'
export default function Theme({ breadcrumbs, theme, topic, topics, pagination, isFollowing, sort }) {
    return (
        <Layout breadcrumbs={breadcrumbs}>

            <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
                <div className='grid grid-cols-1 items-center bg-slate-100 rounded-lg shadow-md mb-3'>
                    <div className='p-4'>
                        <h1 className='text-2xl font-semibold max-sm:ml-2'>{theme.title}</h1>
                        <h1 className='text-md  max-sm:ml-2'>{theme.description}</h1>
                    </div>
                    <div className='flex items-center justify-end py-5 pr-2 border border-t-slate-200'>
                        <Followers item={theme} type={"theme"} isFollowing={isFollowing} />
                    </div>

                </div>
                <div className='mb-2'>
                    <AddNewPostButton topics={topics} defaultID={theme.id} />
                </div>
                <PageCard pagination={pagination} sort={sort}>
                    {pagination.data.map((post, index) => {
                        return (<PostElement key={index} topic={topic} theme={theme} post={post} />)
                    })}


                </PageCard>




            </div>

        </Layout>
    )
}
