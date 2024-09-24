import Pagination from "../Components/pagination"
export default function PageCard({ children, rounded = "rounded-t-lg", pagination, sort = null }) {
    return (
        <div className="">
            <div className={`bg-blue-300 p-2 ${rounded}`}>
                <Pagination pagination={pagination} sort={sort} />
            </div>
            <div>
                {children}
            </div>
            <div className={`bg-blue-300 p-2 rounded-b-lg`}>
                <Pagination pagination={pagination} sort={null} />
            </div>
        </div>
    )
}



