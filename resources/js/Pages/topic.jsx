import Layout from '../Layouts/layout'
import Topics from '../Components/topics'
import SideBar from '../Components/sidebar'
export default function Topic({breadcrumbs,user,topic}){
    return(
        <Layout breadcrumbs={breadcrumbs} user={user}>
           
            <div className='grid md:grid-cols-4 sm:grid-cols-1' name="content_block">
                <div name="main_block" className='md:col-span-3 sm:col-span-2 mt-5'>
                    <div className='flex items-center bg-slate-100 rounded-lg p-4 shadow-md'>
                        <div>
                            <h1 className='text-2xl font-semibold max-sm:ml-2'>{topic[0].title}</h1>
                        </div>
                        
                    </div>
                    
                    <Topics topic={topic[0]}/> 
                    
                    
                    
                </div>
                <SideBar/>
            </div>
            
            
        </Layout>
    )
}
