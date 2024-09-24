import PageInput from "../Components/pageInput"
import PageSort from "./pageSort"
import { Link } from "@inertiajs/react"
export default function Pagination({ sort, pagination }) {
    let arr = []
    let index = -3
    if (pagination.last_page - pagination.current_page <= 2) {
        index += -3 + pagination.last_page - pagination.current_page
    }
    while (arr.length < 7 && arr.length < pagination.last_page && pagination.current_page + index <= pagination.last_page) {

        if (pagination.current_page + index > 0) {
            arr.push(
                <Page
                    key={pagination.current_page + index}
                    href={pagination.links[pagination.current_page + index].url}
                    isActive={pagination.current_page + index == pagination.current_page}
                >

                    {pagination.current_page + index}
                </Page>
            )
        }
        index += 1


    }
    return (
        <div className="flex justify-between items-center max-lg:grid grid-cols-1">
            <nav className="flex max-lg:grid grid-cols-3 max-lg:text-sm">
                <ul className="flex gap-2 max-lg:justify-start ">
                    {pagination.first_page_url != null && <Page href={pagination.first_page_url}><i className="fa fa-solid fa-angles-left" /></Page>}
                    {pagination.prev_page_url != null && <Page href={pagination.prev_page_url}>Previous</Page>}
                </ul>
                <ul className="flex gap-1 max-lg:hidden">


                    {arr.map(page => (page))}



                </ul>
                <ul className="flex gap-2 max-lg:order-last max-lg:justify-end">
                    {pagination.next_page_url != null && <Page href={pagination.next_page_url}>Next</Page>}
                    {pagination.last_page_url != null && <Page href={pagination.last_page_url}><i className="fa fa-solid fa-angles-right" /></Page>
                    }
                </ul>
                <ul>

                    <PageInput pagination={pagination}>Page {pagination.current_page} out of {pagination.last_page} </PageInput>
                </ul>
            </nav>
            {sort != null &&
                <nav className="flex max-lg:text-sm">
                    <ul>

                        <PageSort sort={sort} />
                    </ul>
                </nav>
            }
        </div>
    )
}

function Page({ children, isActive = false, href }) {
    const styleClass = isActive ? "text-md font-semibold bg-blue-400 text-slate-200 rounded-full hover:opacity-70 px-3 py-1" : "text-md font-semibold text-slate-200 rounded-full hover:opacity-70 px-3 py-1"
    return (
        <li>
            <Link preserveState preserveScroll href={href} className={styleClass} >{children}</Link>
        </li>
    )
}