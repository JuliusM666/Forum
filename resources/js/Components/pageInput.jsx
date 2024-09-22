import useComponentVisible from "./Hooks/useComponentVisible";
import { useState } from "react";
import { Link } from "@inertiajs/react";
export default function PageInput({ children, pagination }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const [page, setPage] = useState(pagination.current_page)
    return (
        <div ref={ref}>
            <button onClick={() => setIsComponentVisible(!isComponentVisible)}>
                <span className="max-lg:text-xs text-md whitespace-nowrap font-semibold text-slate-200 rounded-full hover:opacity-70 px-3 py-1">
                    {children}
                    <i className="fa fa-caret-down" />
                </span>
            </button>
            {isComponentVisible && (
                <div className="absolute">
                    <div className="border border-slate-400 shadow-2xl bg-white rounded-md mt-2">
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 p-4 gap-2">
                                <input min={1} max={pagination.last_page} value={page} onChange={(e) => setPage(e.target.value)} className="w-44 rounded-lg" type="number" />
                                <Link preserveScroll preserveState href={pagination.links[page].url} className="bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center w-full font-semibold max-h-fit text-slate-200">Show</Link>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}