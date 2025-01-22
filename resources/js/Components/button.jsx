export default function Button({ disabled, children, width = "max-w-fit", handleClick, color = "bg-blue-300" }) {
    return (

        <button disabled={disabled} onClick={handleClick} className={`${color} rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center ${width}  font-semibold max-h-fit text-slate-200`}>
            {children}
        </button>

    )
}