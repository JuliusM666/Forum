import { router } from "@inertiajs/react"

const idleTime={}
let idleTimeIntervalID = null
let lastDate = null
const setLastActionTime = () => {
    if(Date.now() - lastDate > 10000 ){
        lastDate = Date.now()
        localStorage.setItem("last_action", Date.now())
    }
}
idleTime.initializeIdleTime = (setActiveChat)=>{

    window.addEventListener("load",setLastActionTime)
    document.addEventListener("mousemove",setLastActionTime)
    document.addEventListener("mousedown",setLastActionTime)
    document.addEventListener("keydown",setLastActionTime)
    document.addEventListener("scroll",setLastActionTime)

    idleTimeIntervalID = setInterval(() => {
        if (Date.now() - localStorage.getItem("last_action") > import.meta.env.VITE_IDLE_TIME * 60000) {
            router.post("/logout", {}, { onSuccess: () => { setActiveChat(null); localStorage.setItem("logged_out", true) } })
        }
    }, 10000)
   
}
idleTime.clearIdleTime = ()=>{
    clearInterval(idleTimeIntervalID)
    window.removeEventListener("load",setLastActionTime)
    document.removeEventListener("mousemove",setLastActionTime)
    document.removeEventListener("mousedown",setLastActionTime)
    document.removeEventListener("keydown",setLastActionTime)
    document.removeEventListener("scroll",setLastActionTime)
}
export default idleTime