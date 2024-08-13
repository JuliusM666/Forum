export default function SearchBar(){
    return(
        
            <form action="" method="POST">
                <div className="relative align-middle">
                    <input className="rounded-2xl text-md pl-3 pr-8 py-1 border-0 focus:ring-0" type="text" placeholder="search..."/>
                    <button className="h-full absolute right-2"><i className="fa fa-search"/></button>
                </div>
            </form>
        
    )
}