import { Link, usePage } from "@inertiajs/react"
export default function Followers({ item, isFollowing, type }) {
    const { auth } = usePage().props
    const isFollowingStyle = "flex text-slate-100 items-center gap-5 justify-between bg-blue-700 hover:opacity-70 rounded-full pr-1 py-1"
    const isNotFollowingStyle = "flex  items-center gap-5 justify-between bg-slate-100 border-blue-700 border text-blue-700 hover:opacity-70 rounded-full pr-1 py-1"
    return (
        <Link as="button" type="button" disabled={auth.user == null} href={'/follow/' + type} method="post" preserveState preserveScroll data={{ id: item.id }}
            className={isFollowing ? isFollowingStyle : isNotFollowingStyle}>
            <div className="pl-4">
                <h1 className="text-sm">Followers</h1>
            </div>
            <div className="rounded-full bg-slate-100  px-4 py-1">
                <h1 className="text-sm text-slate-700 ">{item.followers_count}</h1>
            </div>
        </Link>
    )
}