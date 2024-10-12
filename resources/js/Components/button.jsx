export default function Button({ disabled, children, width = "max-w-fit", handleClick }) {
    return (

        <button disabled={disabled} onClick={handleClick} className={`bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center ${width}  font-semibold max-h-fit text-slate-200`}>
            {children}
        </button>

    )
}