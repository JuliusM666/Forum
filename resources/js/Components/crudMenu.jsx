import useComponentVisible from "./Hooks/useComponentVisible"
import { Link } from '@inertiajs/react'
export default function CrudMenu({ item, handleEdit, isPost }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    const destroyRoute = isPost ? route('post.destroy', item.id) : route('reply.destroy', item.id)
    return (
        <div ref={ref} className=" text-slate-700 relative">
            <button className="mr-1 hover:opacity-70" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                <i className="fa-solid fa-caret-down" />
            </button>
            {isComponentVisible &&

                <div className="absolute max-md:text-2xl max-md:p-4 max-md:left-0  z-10 bg-blue-100 border-slate-700 border-0.5 left-1/2 rounded-tr-lg p-2  transform -translate-x-1/2 -translate-y-1/2">
                    <ul className="max-md:flex max-md:gap-2">
                        <li>
                            <button className="hover:opacity-70" onClick={handleEdit}><i className="fa-solid fa-pen-to-square" /></button>
                        </li>
                        <li>
                            <Link className="hover:opacity-70" href={destroyRoute} preserveScroll method="post" as="button" type="button"><i className="fa-solid fa-trash" /></Link>

                        </li>
                    </ul>

                </div>

            }
        </div>

    )
}