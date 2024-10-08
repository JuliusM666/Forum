export default function GoogleLink() {
    return (
        <a href={route('socialite.auth', 'google')} className="bg-blue-500 rounded-3xl lg:max-xl:text-sm  whitespace-nowrap hover:bg-opacity-80  py-2 px-4 text-center  font-semibold w-full max-h-fit text-slate-200">

            <span className="mr-1 float-left"><i className="fa-brands fa-google" /></span>
            <span>Login with Google</span>
        </a>
    )
}