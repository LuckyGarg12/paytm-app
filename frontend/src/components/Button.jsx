export default function Button({label, onClick}) {
    return(
        <button onClick={onClick} type="button" className="w-full bg-gray-800 text-white hover:bg-gray-900 active:outline-none active:ring-4 active:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
    )
}