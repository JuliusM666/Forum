import { useState } from "react"
import AddModal from "../Components/addModal"
import FormInput from "../Components/formInput";
import TextEditor from "../Components/textEditor";
import { useForm } from '@inertiajs/react';
import ValidationError from "../Components/validationError";
export default function AddNewPostButton({topics}){
    const [showModal,setShowModal]=useState(false)
    const { data, setData, post, processing, errors,clearErrors,reset } = useForm({
        title:'',
        message: '',
        theme_id:topics[0].themes[0].id,
      
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
                        <PostInput errors={errors.theme_id} name={"theme_id"} value={data.theme_id} setData={setData} topics={topics}/>
                        <div className="border-slate-200 border-y-2 p-2">
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


function PostInput({topics,value,setData,name,errors}){
   return(
        <div className="grid grid-cols-1 gap-1 p-2">

            <label className="text-slate-600 text-md font-semibold" htmlFor="themes">Choose topic*</label>
            <select value={value} onChange={(e)=>setData(name,e.target.value)} className="rounded-md w-full text-slate-600 border-slate-600 bg-slate-50" id="themes" >
            
            {Object.keys(topics).map(function(keyName, keyIndex) {
                           
                            return(
                                <OptionGroup  key={keyName} label={topics[keyName].title}>
                                      {Object.keys(topics[keyName].themes).map(function(name, index) {
                           
                                                 return( <option key={index} value={topics[keyName].themes[name].id}>{topics[keyName].themes[name].title}</option>)
                                      })}
                                </OptionGroup>
                            )
                            
                        })}

            </select>
            <ValidationError errors={errors}/>
       
        </div>
    )
}
function OptionGroup({children,label}){
    return ( <optgroup className="font-semibold" label={label}>
           {children}                         
   
    </optgroup>)
}