export default function FacebookLink() {
    return (
        <a href={route('socialite.auth', 'facebook')} className="opacity-10 bg-blue-700 rounded-3xl lg:max-xl:text-sm  whitespace-nowrap hover:bg-opacity-80  py-2 px-4 text-center  font-semibold w-full max-h-fit text-slate-200">

            <span className="mr-1 float-left"><i className="fa-brands fa-square-facebook" style={{ color: "#ffffff" }}></i></span>
            <span>Login with Facebook</span>
        </a>
    )
}