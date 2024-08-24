import PageInput from "../Components/pageInput"
import PageFilter from "../Components/pagefilter"
export default function Pagination({filter,rounded,pagination}){
    let arr=[]
    let index=-3
    if(pagination.last_page-pagination.current_page<=2){
        index+=-3+pagination.last_page-pagination.current_page
    }
    while(arr.length<7 && arr.length<pagination.last_page && pagination.current_page+index<=pagination.last_page){
        
            if(pagination.current_page+index>0){
                arr.push(
                    <Page 
                    key={pagination.current_page+index}
                    href={pagination.first_page_url.replace(/[?]page=[0-9]+/g,'?page='+(pagination.current_page+index))}
                    isActive={index==0}>{pagination.current_page+index}</Page>
                )
            }
            else{
                
            }
           
            index+=1
       
       
    }
    return(
        <div className="flex justify-between items-center max-lg:grid grid-cols-1">
    <nav className="flex max-lg:grid grid-cols-3 max-lg:text-sm">
    <ul className="flex gap-2 max-lg:justify-start ">
    {pagination.first_page_url!=null && <Page href={pagination.first_page_url}><i className="fa fa-solid fa-angles-left"/></Page>}
        {pagination.prev_page_url!=null && <Page href={pagination.prev_page_url}>Previous</Page>}
    </ul>
    <ul className="flex gap-1 max-lg:hidden">
       
   
    {arr.map(page => (page))} 
      
       
        
    </ul>
    <ul className="flex gap-2 max-lg:order-last max-lg:justify-end">
    {pagination.next_page_url!=null && <Page href={pagination.next_page_url}>Next</Page>}
    {pagination.last_page_url!=null &&  <Page href={pagination.last_page_url}><i className="fa fa-solid fa-angles-right"/></Page>
    }
    </ul>
    <ul>
       
        <PageInput pagination={pagination}><Page><span className="max-lg:text-xs">Page {pagination.current_page} out of {pagination.last_page} <i className="fa fa-caret-down"/></span></Page></PageInput>
    </ul>
    </nav>
    {filter && 
         <nav className="flex max-lg:text-sm">
         <ul>
            
             <PageFilter><Page><span>Sort by <i className="fa fa-caret-down"/></span></Page></PageFilter>
         </ul>
         </nav>
    }
    </div>
    )
}

function Page({children,isActive=false,href}){
    return(
        <li>
            <a style={{backgroundColor:isActive?"#1d4ed8":""}} href={href} className="text-md font-semibold text-slate-200 rounded-full hover:bg-blue-200 px-3 py-1" >{children}</a>
        </li>
    )
}