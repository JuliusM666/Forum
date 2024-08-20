
export default function Modal({children}){
    
    return(
        
       
           
        <div className="z-10 absolute mt-5 md:w-1/3 w-11/12 m-auto left-0 right-0"  id="modal">
            
            {children}
            
            
        </div>
        
        
        
    )
}