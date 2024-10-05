export default function CloseButton({ handleOnClick }) {
    return (
        <button className="text-white p-2 hover:opacity-70" onClick={handleOnClick}>
            <i className="fa-solid fa-x"></i>
        </button>
    )
}