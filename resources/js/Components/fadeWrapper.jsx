import { useEffect, useState, useRef } from "react"
export default function FadeWrapper({ children, isVisible }) {
    const [visible, setVisible] = useState(isVisible)
    const isMounted = useRef(false)
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
        }
        else if (isVisible) {
            setVisible(true)
            transitionOpen()


        }
        else {
            transitionClose()

        }
    }, [isVisible])

    async function transitionOpen() {
        const element = document.getElementById('modal')
        if (!element) {
            return
        }
        for (let i = 0; i <= 100; i++) {
            await new Promise((resolve) => {
                setTimeout(() => { resolve() }, 5)
            })
            element.style.filter = `opacity(${i}%)`;
        }

    }
    async function transitionClose() {
        const element = document.getElementById('modal')
        if (!element) {
            return
        }
        for (let i = 100; i > 0; i--) {
            await new Promise((resolve) => {
                setTimeout(() => { resolve() }, 1)
            })
            element.style.filter = `opacity(${i}%)`;
        }
        setVisible(false)

    }
    return (
        <>
            {(visible || isVisible) &&
                <div>
                    {children}
                </div>

            }
        </>

    )
}