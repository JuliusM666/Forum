import { Link } from "@inertiajs/react"
export default function error404({ }) {
    return (
        <div className='min-w-screen flex gap-0 min-h-screen bg-gradient-to-r from-slate-100 items-center justify-center to-blue-200'>
            <div className="text-center">
                <div className="flex items-center">
                    <h1 className="text-9xl drop-shadow-sm text-slate-100 font-bold">404</h1>
                    <h1 className="text-end drop-shadow-sm transform -rotate-90 text-slate-700 text-3xl font-bold">code</h1>
                </div>

                <h1 className="text-center my-8 drop-shadow-sm text-slate-700 text-xl font-bold">Sorry we can't find that page...</h1>
                <Link className="text-slate-700 bg-slate-100 rounded-md  px-2 font-medium text-xl drop-shadow-md text-center hover:opacity-70" href={route("home")}>Go home</Link>
            </div>
        </div>

    )

}