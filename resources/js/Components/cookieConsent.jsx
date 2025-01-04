import { useState, useEffect } from 'react';
export default function CookieConsent() {
    const [consent, setConsent] = useState(localStorage.getItem("cookieConsent"))
    useEffect(() => {
        if (consent) {
            localStorage.setItem("cookieConsent", consent)
        }
    }, [consent])
    return (
        <>
            {consent == null &&
                <div className="fixed z-10 w-full shadow-slate-300 shadow-inner bg-slate-100 bottom-0" id="modal">
                    <div className="flex justify-between p-2 max-md:grid max-md:gap-4 max-md:justify-center">
                        <h1 className="text-slate-700 text-lg max-md:text-center">This site uses cookies to offer better user experience. </h1>
                        <div className="flex gap-2 max-md:justify-between">
                            <button onClick={() => setConsent(true)} className="bg-blue-300 rounded-lg p-2 hover:opacity-70 text-slate-100 shadow-sm">I accept cookies</button>
                            <button onClick={() => setConsent(false)} className="border-slate-700 border rounded-lg p-2 hover:opacity-70 text-slate-700 shadow-sm">I decline cookies</button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}