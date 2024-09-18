import { Link } from '@inertiajs/react'
import ToggleTheme from './toggleTheme';
export default function MobileLinks({ handleSmallSearchClick, handleMenuClick }) {
    return (
        <div className="flex gap-4">
            <Link preserveScroll href={route('home')}><i className="fa fa-house" /></Link>
            <Link preserveScroll href={route('activity')}><i className="fa fa-newspaper" /></Link>
            <button onClick={handleSmallSearchClick}><i className="fa fa-magnifying-glass" /></button>
            <ToggleTheme />
            <button onClick={handleMenuClick}><i className="fa fa-bars" /></button>
        </div>
    )
}