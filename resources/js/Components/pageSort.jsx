import { useState, useRef } from "react";
import useComponentVisible from "./Hooks/useComponentVisible";
import { router } from '@inertiajs/react'
export default function PageSort({ children, sort }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    const [currentSort, setCurrentSort] = useState(sort.currentSort)
    const [loading, setLoading] = useState(false)
    async function changeSort(value) {
        if (value != sort.currentSort && loading == false) {
            setCurrentSort(value)
            setLoading(true)
            await new Promise((resolve, reject) => {
                setTimeout(() => resolve(), 2000)
            });
            router.visit(sort.links[value], { preserveScroll: true })
        }

    }

    return (
        <div ref={ref}>
            <button className="text-md font-semibold text-slate-200 rounded-full hover:opacity-70 px-3 py-1" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                <span>Sort by <i className="fa fa-caret-down" /></span>
            </button>
            {isComponentVisible && (
                <div className="absolute z-10">
                    <div className="w-0 h-0 mx-auto
                                    border-l-[5px] border-l-transparent
                                    border-b-[5px] border-b-white
                                    border-r-[5px] border-r-transparent">
                    </div>
                    <div className="shadow-2xl bg-white rounded-md">
                        <ul>
                            <Sort key="1" handleClick={changeSort} title={"Title"} value={"title"} currentSort={currentSort} />
                            <Sort key="2" handleClick={changeSort} title={"Creation date"} value={"creationDate"} currentSort={currentSort} />
                            <Sort key="3" handleClick={changeSort} title={"Latest answers"} value={"latestAnswers"} currentSort={currentSort} />
                            <Sort key="4" handleClick={changeSort} title={"Answers"} value={"answers"} currentSort={currentSort} />
                            <Sort key="5" handleClick={changeSort} title={"Views"} value={"views"} currentSort={currentSort} />
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )

}

function Sort({ title, value, handleClick, currentSort }) {
    return (
        <li className="cursor-pointer" onClick={() => handleClick(value)}>
            <span className="flex hover:bg-slate-200 items-center p-1 justify-center text-md gap-2 text-slate-600">
                <input readOnly checked={currentSort == value} id="checkbox" className="rounded-full text-black focus:ring-0 bg-white " type="checkbox" />
                <div className="w-28" htmlFor="checkbox">{title}</div>
            </span>
        </li>
    )
}