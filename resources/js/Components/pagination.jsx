import PageInput from "../Components/pageInput"
import PageFilter from "../Components/pagefilter"
export default function Pagination({filter,rounded}){
    return(
        <div className="flex justify-between items-center max-lg:grid grid-cols-1">
    <nav className="flex max-lg:grid grid-cols-3 max-lg:text-sm">
    <ul className="flex gap-2 max-lg:justify-start ">
        <Page><i className="fa fa-solid fa-angles-left"/></Page>
        <Page>Previous</Page>
    </ul>
    <ul className="flex gap-1 max-lg:hidden">
       
        <Page isActive={true}>1</Page>
        <Page>2</Page>
        <Page>3</Page>
        <Page>4</Page>
        <Page>5</Page>
        <Page>6</Page>
       
        
    </ul>
    <ul className="flex gap-2 max-lg:order-last max-lg:justify-end">
        <Page>Next</Page>
        <Page><i className="fa fa-solid fa-angles-right"/></Page>
       
    </ul>
    <ul>
       
        <PageInput><Page><span className="max-lg:text-xs">Page 1 out of 15 <i className="fa fa-caret-down"/></span></Page></PageInput>
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

function Page({children,isActive=false}){
    return(
        <li>
            <a style={{backgroundColor:isActive?"#1d4ed8":""}} className="text-md font-semibold text-slate-200 rounded-full hover:bg-blue-200 px-3 py-1" >{children}</a>
        </li>
    )
}