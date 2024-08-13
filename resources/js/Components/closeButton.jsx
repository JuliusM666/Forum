export default function CloseButton({handleOnClick}){
    return(
        <button className="text-white" onClick={handleOnClick}>
            <i className="fa-solid fa-x"></i>
        </button>
    )
}