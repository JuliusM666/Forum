export default function CheckBox({name,title,required}){
    return(
        <div className="flex justify-start items-center">
             <input className="rounded-md mr-2 text-blue-400" id={name} name={name} type="checkbox"/>
            <label className="text-slate-600 text-md font-semibold" htmlFor={name}>
                {title}{required && ("*")}
            </label>
           
    </div>
    )
}