export default function Button({children,width="max-w-fit",handleClick}){
    return(
        
        <button onClick={handleClick} className={`bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center ${width}  font-semibold max-h-fit text-slate-200`}>
            {children}
        </button>
            
    )
}