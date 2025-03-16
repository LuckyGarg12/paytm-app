export default function Appbar() {
    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 font-medium text-2xl">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center mr-2">
                    Hello, User
                </div>
                <div className="flex flex-col justify-center mr-2">
                    <div className="rounded-full h-12 w-12 flex flex-col justify-center bg-slate-200">
                        <div className="text-center">
                            U
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}