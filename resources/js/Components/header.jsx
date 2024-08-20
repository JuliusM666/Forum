import Link from '../Components/link';
import Button from '../Components/button';
import SearchBar from '../Components/searchBar';
import ToolTip from '../Components/tooltip';
import MobileLinks from '../Components/mobileLinks';
export default function Header({handleRegistrationClick,handleLoginClick,handleSmallSearchClick,handleMenuClick}){
    
    
    return(
         <div className="md:mt-1 bg-slate-100 min-w-screen rounded-sm max-sm:px-3 md:px-16  py-2">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-semibold text-transparent bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text">Forum</h1>
                </div>
                <div className='md:hidden'>
                    <MobileLinks handleSmallSearchClick={handleSmallSearchClick} handleMenuClick={handleMenuClick}/>
                </div>
                <div className='flex items-center gap-2 max-md:hidden'>
                    
                    <Link handleClick={handleLoginClick}>Already have an account? Login</Link>
                    <Button handleClick={handleRegistrationClick}>Register</Button>
                    <ToolTip message={"settings"}><a className='text-2xl'><i className="fa-solid fa-toggle-on" style={{color: "#c0c0c0"}}/></a></ToolTip>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 max-md:hidden">
                <div className='inline-flex items-center'>
                    <Link>Forum</Link>
                    <Link dropdown={true} links={{"All activity":"#","Search":"#"}}>Activity flow</Link>
                    <Link dropdown={true} links={{"Ads":"#"}}>Ads</Link>
                    <Link>Feedback</Link>
                    <Link>Rules</Link>
                    <Link>Membership</Link>
                </div>
                <div>
                    <SearchBar/>
                </div>
            </div>
            
        </div>
        
    )
}
