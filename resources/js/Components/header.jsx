import LinkComponent from '../Components/linkComponent';
import Button from '../Components/button';
import SearchBar from '../Components/searchBar';
import ToggleTheme from './toggleTheme';
import MobileLinks from '../Components/mobileLinks';
export default function Header({ handleRegistrationClick, handleLoginClick, handleSmallSearchClick, handleMenuClick }) {


    return (
        <>
            <div className="md:mt-1 bg-slate-100 min-w-screen rounded-sm max-md:px-3 md:px-16 py-2 dark:bg-slate-700">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-5xl font-semibold text-transparent bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text">Forum</h1>
                    </div>
                    <div className='lg:hidden'>
                        <MobileLinks handleSmallSearchClick={handleSmallSearchClick} handleMenuClick={handleMenuClick} />
                    </div>
                    <div className='flex items-center gap-3 max-lg:hidden'>

                        <button className="text-slate-400 cursor-pointer font-semibold rounded-xl px-2 py-1  text-center hover:bg-slate-400 hover:text-slate-100" onClick={handleLoginClick}>Already have an account? Login</button>
                        <Button handleClick={handleRegistrationClick}>Register</Button>
                        <div className='text-2xl'>
                            <ToggleTheme />
                        </div>

                    </div>
                </div>
            </div>
            <nav className="mt-0 sticky top-0 z-10 flex justify-between items-center  max-lg:hidden  bg-slate-100 min-w-screen rounded-sm max-md:px-3 md:px-16  py-2">
                <div className='inline-flex items-center gap-2'>

                    <LinkComponent href={route('home')} page={"main"}>Forum</LinkComponent>
                    <LinkComponent links={{ "All activity": route('activity'), "Search": route('activity') }} page={"activity"}>Activity flow</LinkComponent>
                    <LinkComponent href={route('rules')} page={"rules"}>Rules</LinkComponent>
                    <LinkComponent href={route('membership')} page={"membership"}>Membership</LinkComponent>
                </div>
                <div>
                    <SearchBar />
                </div>
            </nav>
        </>


    )
}
