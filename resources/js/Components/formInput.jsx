export default function FormInput({title,required,name,type}){
    return(
        <div className="grid grid-cols-1 gap-1">
            <label className="text-slate-600 text-md font-semibold" htmlFor={name}>
                {title}{required && ("*")}
            </label>
            <input className="rounded-md text-slate-600 border-slate-600 bg-slate-50" id={name} name={name} type={type}/>
        </div>
    )
}