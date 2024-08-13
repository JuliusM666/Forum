import Facebook from '../Components/facebook'
export default function Breadcrumb({children}){
    return(
        
        <nav className="bg-slate-100 rounded-xl p-2 mt-2 h-fit">
            <div className="flex justify-between items-center">
                
                    <ul className="inline-flex items-center">
                    <li className="text-xs text-slate-400 font-semibold mx-2 ">
                    <a className=" hover:bg-white hover:opacity-25" href="#">Home <i className="fa fa-solid fa-angle-right"/></a>
                    
                    </li>
                    
                    </ul>
                
                
                    <ul  className="inline-flex items-center max-sm:hidden">
                        <li className="text-xs text-slate-400 font-semibold mx-4">
                        <a className=" hover:bg-white hover:opacity-25" href="#"><i className="fa fa-solid fa-newspaper"></i> All activity</a>
                        </li>
                        <li>
                            <Facebook/>
                        </li>
                    </ul>
                        
                
            </div>
            
        </nav>
    )
}