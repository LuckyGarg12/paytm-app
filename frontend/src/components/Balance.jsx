export default function Balance({value}) {
    return(
        <div className="flex">
            <div className="font-bold text-lg">
                Your Balance is:
            </div>
            <div className="font-semibold ml-4 text-center text-lg">
                Rs. {value}
            </div>
        </div>
    )
}