export default function ValidationError({errors}){
    return (
        <div className="text-red-500 text-md">
            {errors}
        </div>
    )
}