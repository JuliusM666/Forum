import { Link } from "@inertiajs/react"
export default function Card({ name, SubName, children, ButtonComponent, shadow = "shadow-md", route = "" }) {
    return (
        <div className={`w-full mt-5 ${shadow}`}>
            <div className="bg-blue-300 p-2 rounded-t-lg">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Link preserveState className={route == "" ? "text-white font-semibold text-lg ml-3 pointer-events-none" : "text-white font-semibold text-lg ml-3"} href={route}>{name}</Link>
                        {SubName != null && SubName}
                    </div>
                    <div className="mr-1">{ButtonComponent}</div>

                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}