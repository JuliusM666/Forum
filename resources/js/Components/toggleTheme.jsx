import useCookieConsent from "./Hooks/useCookieConsent"
export default function ToggleTheme() {
    const [theme, setTheme] = useCookieConsent('theme')
    document.getElementById("body").className = theme
    if (theme == "dark") {
        return (
            <button className="text-center hover:opacity-70 dark:text-slate-100" onClick={() => setTheme("white")}>
                <i className="fa-regular fa-moon" />
            </button >
        )
    }
    else {
        return (
            <button className="text-center hover:opacity-70  dark:text-slate-100" onClick={() => setTheme("dark")}>
                <i className="fa-solid fa-moon" />
            </button>
        )
    }

}

