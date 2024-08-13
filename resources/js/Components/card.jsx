export default function Card({name,children,ButtonComponent,shadow="shadow-md"}){
    return(
        <div className={`w-full mt-5 ${shadow}`}>
            <div className="bg-blue-300 p-2 rounded-t-lg">
                <div className="flex justify-between">
                <h1 className="text-white font-semibold text-lg ml-3 ">{name}</h1>
                <div className="mr-1">{ButtonComponent}</div>
                
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}