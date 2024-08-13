import Facebook from "../Components/facebook"
export default function Footer(){
    return(
        
      <nav className="bg-transparent rounded-xl py-4 mt-5">
      <div className="grid md:grid-cols-3 sm:grid-cols-1">
          
              <ul className="flex items-center justify-center md:justify-start order-1">
                <FooterLink text={"Privacy policy"} link={"#"}/>
                <FooterLink text={"Contacts"} link={"#"}/>
                <FooterLink text={"Rules"} link={"#"}/>
                <FooterLink text={"Cookie Policy"} link={"#"}/>
                <FooterLink text={"Team"} link={"#"}/>
              </ul>
              <div className="flex items-center justify-center text-2xl md:order-2 sm:order-1">
                <Facebook/>
              </div>
              <ul className="flex items-center justify-center md:justify-end  order-3">
                  <li className="text-xs text-slate-400 font-semibold mx-4">
                  <p className="inline-block align-middle"> All rights reserved ©</p>
                  </li>
              </ul>
                  
          
      </div>
  </nav>
       
    )
}

function FooterLink({text,link}){
  return(
    <li className="text-xs text-slate-400 font-semibold mr-4">
        <a className="inline-block align-middle" href={link}>{text}</a>
    </li>
  )
}
