
export default function Modal({children}){
    
    return(
        
        <div className="flex justify-center ">
           
        <div className="z-10 absolute top-20 w-1/3"  id="modal">
            {children}
        </div>
        </div>
        
        
    )
}