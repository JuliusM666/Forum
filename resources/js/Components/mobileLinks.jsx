export default function MobileLinks({handleSmallSearchClick,handleMenuClick}){
    return(
        <div className="flex gap-4">
            <a href="#"><i className="fa fa-house"/></a>
            <a href="#"><i className="fa fa-newspaper"/></a>
            <a href="#" onClick={handleSmallSearchClick}><i className="fa fa-magnifying-glass"/></a>
            <a href="#"><i className="fa fa-toggle-on"/></a>
            <a href="#" onClick={handleMenuClick}><i className="fa fa-bars"/></a>
        </div>
    )
}