import ValidationErrros from "../Components/validationError"
export default function CheckBox({value,errors,setData,name,title,required}){
    return(
        <div className="flex justify-start items-center">
             <input className="rounded-md mr-2 text-blue-400" checked={value} id={name} onChange={e=>setData(name,!value)} type="checkbox"/>
            <label className="text-slate-600 text-md font-semibold" htmlFor={name}>
                {title}{required && ("*")}
            </label>
            <ValidationErrros errors={errors}/>
            
        </div>
    )
}