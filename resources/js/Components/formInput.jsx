import ValidationError from "../Components/validationError"
export default function FormInput({errors,title,name,required,value,setData,type}){
    return(
        <div className="grid grid-cols-1 gap-1">
            <label className="text-slate-600 text-md font-semibold" htmlFor={title}>
                {title}{required && ("*")}
            </label>
            <input value={value} onChange={e=>setData(name,e.target.value)} className="rounded-md text-slate-600 border-slate-600 bg-slate-50" id={title} type={type}/>
            <ValidationError errors={errors}/>
        </div>
    )
}