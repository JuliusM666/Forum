import { useState } from "react"
export default function ToggleTheme() {
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    document.getElementById("body").className = theme
    function changeTheme(theme) {
        localStorage.setItem("theme", theme)
        setTheme(theme)
    }
    if (theme == "dark") {
        return (
            <button className="text-center hover:opacity-70 dark:text-slate-100" onClick={() => changeTheme("white")}>
                <i className="fa-regular fa-moon" />
            </button >
        )
    }
    else {
        return (
            <button className="text-center hover:opacity-70  dark:text-slate-100" onClick={() => changeTheme("dark")}>
                <i className="fa-solid fa-moon" />
            </button>
        )
    }

}

