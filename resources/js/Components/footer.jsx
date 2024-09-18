import Facebook from "../Components/facebook"
import { Link } from '@inertiajs/react'
export default function Footer() {
  return (

    <nav className="bg-transparent rounded-xl py-4 mt-5">
      <div className="grid md:grid-cols-3 sm:grid-cols-1">

        <ul className="flex items-center justify-center lg:justify-start order-1">
          <FooterLink text={"Forum"} href={route('home')} />
          <FooterLink text={"Activity Flow"} href={route('activity')} />
          <FooterLink text={"Search"} href={route('search')} />
          <FooterLink text={"Rules"} href={route('rules')} />
          <FooterLink text={"Membership"} href={route('membership')} />
          <li className="text-xs text-slate-400 font-semibold mr-4">
            <a className="inline-block align-middle" href="https://github.com/JuliusM666">Github</a>
          </li>
        </ul>
        <div className="flex items-center justify-center text-2xl md:order-2 sm:order-1">
          <Facebook />
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

function FooterLink({ text, href }) {
  return (
    <li className="text-xs text-slate-400 font-semibold mr-4">
      <Link preserveScroll preserveState className="inline-block whitespace-nowrap align-middle" href={href}>{text}</Link>
    </li>
  )
}
