import Layout from '../Layouts/layout'
import { Link } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import useModalVisible from '@/Components/Hooks/useModalVisible'
export default function Search({ breadcrumbs, query }) {
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={'search "' + query + '" results'} />
            <div>
                <div className="flex gap-2 items-center">
                    <div className="mr-5 grid place-self-start">
                        <h1 className="text-2xl font-semibold max-sm:ml-2">Search</h1>
                        <h1>query "{query}" results</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-1 items-center justify-items-center">
                        <div className="flex gap-2">
                            <Tab isActive={true}>Posts</Tab>
                            <Tab>Replies</Tab>
                            <Tab>Users</Tab>
                        </div>
                        <div className="flex gap-2">
                            <Filter >filter1</Filter>
                            <Filter>filter2</Filter>
                        </div>

                    </div>


                </div>

            </div>








        </Layout>
    )
}

function Tab({ children, isActive }) {
    return (
        <Link className={`${isActive ? "bg-blue-300" : "bg-slate-100"} h-fit shadow-sm rounded-3xl hover:bg-opacity-80  py-3 px-5 text-center font-semibold text-slate-700`}>{children}</Link>
    )
}

function Filter({ children }) {
    [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false)
    return (<button className="h-fit bg-slate-200 shadow-sm rounded-3xl hover:bg-slate-300  py-2 px-4 text-center font-semibold text-slate-700">
        <span className="flex gap-1 items-baseline">
            {children}
            <i className="fa-solid fa-caret-down" />
        </span>

    </button>)
}