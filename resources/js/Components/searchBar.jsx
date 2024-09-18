import { Link } from '@inertiajs/react'
import { useState } from 'react'
export default function SearchBar() {
    const [query, setQuery] = useState("")
    return (

        <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className="relative align-middle">

                <input value={query} onChange={e => setQuery(e.target.value)} className="w-full rounded-2xl text-md py-1 pr-8 border-0 focus:ring-0 max-sm:border border-1" type="text" placeholder="search..." />
                <Link className="h-full absolute right-2" as="button" href={route("search", { query: query })} preserveState preserveScroll><i className="fa fa-search" /></Link>

            </div>
        </form>

    )
}