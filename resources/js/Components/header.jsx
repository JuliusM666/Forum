import Link from '../Components/link';
import Button from '../Components/button';
import SearchBar from '../Components/searchBar';
import ToolTip from '../Components/tooltip';
import MobileLinks from '../Components/mobileLinks';
export default function Header({handleRegistrationClick,handleLoginClick,handleSmallSearchClick,handleMenuClick,activeLink}){
    
    
    return(
         <div className="md:mt-1 bg-slate-100 min-w-screen rounded-sm max-md:px-3 md:px-16  py-2">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-semibold text-transparent bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text">Forum</h1>
                </div>
                <div className='lg:hidden'>
                    <MobileLinks handleSmallSearchClick={handleSmallSearchClick} handleMenuClick={handleMenuClick}/>
                </div>
                <div className='flex items-center gap-2 max-lg:hidden'>
                    
                    <Link handleClick={handleLoginClick}>Already have an account? Login</Link>
                    <Button handleClick={handleRegistrationClick}>Register</Button>
                    <ToolTip message={"settings"}><a className='text-2xl'><i className="fa-solid fa-toggle-on" style={{color: "#c0c0c0"}}/></a></ToolTip>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 max-lg:hidden">
                <div className='inline-flex items-center gap-2'>
                    <Link  href={route('home')} isActive={"home"==activeLink} >Forum</Link>
                    <Link  dropdown={true} isActive={"activity"==activeLink} links={{"All activity":route('activity'),"Search":route('activity')}}>Activity flow</Link>
                    <Link  href={route('rules')} isActive={"rules"==activeLink}>Rules</Link>
                    <Link  href={route('membership')} isActive={"membership"==activeLink}>Membership</Link>
                </div>
                <div>
                    <SearchBar/>
                </div>
            </div>
            
        </div>
        
    )
}
