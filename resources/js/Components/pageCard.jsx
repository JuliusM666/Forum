import Pagination from "../Components/pagination"
export default function PageCard({children,rounded="rounded-t-lg",filter=true}){
    return(
        <div className="mt-5">
             <div className={`bg-blue-300 p-2 ${rounded}`}>
                <Pagination filter={filter} rounded={rounded}/>
            </div>
            <div>
            {children}
            </div>
            <div className={`bg-blue-300 p-2 ${rounded}`}>
                <Pagination filter={filter} rounded={rounded}/>
            </div>
        </div>
    )
}



