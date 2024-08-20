export default function SearchBar(){
    return(
        
            <form action="" method="POST">
                <div className="relative align-middle">
                    
                    <input className="w-full rounded-2xl text-md py-1 pr-8 border-0 focus:ring-0 max-sm:border border-1" type="text" placeholder="search..."/>
                    <button className="h-full absolute right-2"><i className="fa fa-search"/></button>
                    
                </div>
            </form>
        
    )
}