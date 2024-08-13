export default function TurnButton({isVisible,setIsVisible}){
    return(
        <button className="text-slate-200" onClick={()=>setIsVisible(!isVisible)}>
            {isVisible && <i className="fa-solid fa-square-minus"/>}
            {isVisible==false && <i className="fa-solid fa-square-plus"/> }
        </button>
    )
}