import Layout from '../Layouts/layout'
import PostElement from '@/Components/postElement'
import SideBar from '../Components/sidebar'
import AddNewPostButton from '../Components/addNewPostButton'
import Followers from '../Components/followers'
import PageCard from '../Components/pageCard'
export default function Theme({breadcrumbs,user,posts,theme,topic}){
    return(
        <Layout breadcrumbs={breadcrumbs} user={user}>
           
            <div className='grid md:grid-cols-4 sm:grid-cols-1' name="content_block">
                <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
                    <div className='grid grid-cols-1 items-center bg-slate-100 rounded-lg shadow-md mb-3'>
                        <div className='p-4'>
                            <h1 className='text-2xl font-semibold max-sm:ml-2'>{theme.title}</h1>
                            <h1 className='text-md  max-sm:ml-2'>about</h1>
                        </div>
                        <div className='flex items-center justify-end py-5 pr-2 border border-t-slate-200'>
                            <Followers/>
                        </div>
                        
                    </div>
                    <AddNewPostButton/>
                    <PageCard>
                    {Object.keys(posts).map(function(keyName, keyIndex) {
                            return(
                                <PostElement key={keyIndex} topic={topic} theme={theme} post={posts[keyName]}/>
                            )
                        })}
                    
                 
                    </PageCard>
                    
                    
                    
                    
                </div>
                <SideBar/>
            </div>
            
            
        </Layout>
    )
}
