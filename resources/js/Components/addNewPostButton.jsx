import { useState } from "react"
import AddModal from "../Components/addModal"
import FormInput from "./formInput";
import TextEditor from "./textEditor";
import { useForm } from '@inertiajs/react';
import ValidationError from "./validationError";
export default function AddNewPostButton(){
    const [showModal,setShowModal]=useState(false)
    const { data, setData, post, processing, errors,clearErrors,reset } = useForm({
        title:'',
        message: '',
      
      })
      function clearForm(){
        clearErrors()
        reset()
       
      }
     
      function submit(e) {
        e.preventDefault()
        post('/post', {
            preserveScroll: true,
            onSuccess: () =>{ clearForm(), setShowModal(false)}
            
        })
      
        }
    return(
        <div>
    <div className='flex md:justify-end max-sm:justify-center max-sm:m-1'>
        <button onClick={()=>setShowModal(!showModal)} className='bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center md:max-w-fit max-sm:w-full  font-semibold max-h-fit text-slate-200'><i className='fa fa-plus-circle mr-2'/>New Post</button>
    </div>
    {showModal&&
        <AddModal name={"Add new post: topic1"} handleCloseClick={()=>setShowModal(false)}>
             <form onSubmit={submit}>
                        <div className="p-2">
                        <FormInput errors={errors.title} name={"title"} value={data.title} setData={setData} title={"Post title"} required={true} type={"text"}/>
                        </div>
                        <div className="border-slate-200 border-t-2 p-2">
                        <TextEditor setData={setData} name={"message"}/>
                        </div>
                        <div className="p-2">
                        <ValidationError errors={errors.message}/>
                        </div>
                        
                        <div className="p-2">
                        <button disabled={processing} className='bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center w-full font-semibold max-h-fit text-slate-200'><i className='fa fa-plus-circle mr-2'/>New Post</button>
                        </div>
                       
                    </form>
        </AddModal>
    }
    </div>
    )
}