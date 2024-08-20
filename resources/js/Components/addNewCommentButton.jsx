export default function AddNewCommentButton({disabled=false}){
   
    return(
    
    <div className='flex md:justify-end max-sm:justify-center max-sm:m-1'>
        <button disabled={disabled} onClick={()=>setShowModal(!showModal)} className='bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center md:max-w-fit max-sm:w-full  font-semibold max-h-fit text-slate-200'><i className='fa-regular fa-comments mr-2'/>New comment</button>
    </div>
    
    
    )
}