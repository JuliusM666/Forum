import { useState, useEffect } from 'react'
export default function useCookieConsent(cookieName) {
    const [cookie, setCookie] = useState(localStorage.getItem(cookieName))
    function changeCookie(val) {
        if (localStorage.getItem('cookieConsent') == "true") {
            localStorage.setItem(cookieName, val)
            setCookie(val)
        }
    }
    return [cookie, changeCookie]

}