import Pagination from "../Components/pagination"
export default function PageCard({children,rounded="rounded-t-lg",filter=true,pagination=null}){
    return(
        <div className="">
             <div className={`bg-blue-300 p-2 ${rounded}`}>
                <Pagination pagination={pagination} filter={filter} rounded={rounded}/>
            </div>
            <div>
            {children}
            </div>
            <div className={`bg-blue-300 p-2 ${rounded}`}>
                <Pagination pagination={pagination} filter={filter} rounded={rounded}/>
            </div>
        </div>
    )
}



