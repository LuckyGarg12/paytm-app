import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import axios from "axios";

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const amount = useRef(null);
    const navigate = useNavigate();

    return (
        <div className="flex justify-center h-screen bg-slate-200">
            <div className="flex flex-col justify-center h-full">
                <div className="rounded bg-gray-50 shadow-lg w-90">
                    <div className="flex justify-center w-full h-20 mb-8 mt-6">
                        <Heading label={"Send Money"} />
                    </div>
                    <div className="flex mx-10">
                        <div className="flex flex-col justify-center text-center text-xl rounded-full bg-green-500 w-12 h-12">
                            <div className="text-white">
                                {name[0]}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center ml-2 font-medium text-2xl">
                            {name}
                        </div>
                    </div>
                    <div className="mx-10">
                        <InputBox label="Amount:" refer={amount} placeholder="123" type="text" />
                    </div>
                    <div className="mx-10 mt-4 mb-10">
                        <button onClick={
                            async ()=>{
                                await axios.post("http://localhost:3000/api/v1/account/transfer", {"to":id, "amount":parseFloat(amount.current.value)}, {headers:{"Authorization":"Bearer " + localStorage.getItem("token")}}) 
                                navigate("/dashboard")
                            }
                        } className="bg-green-500 w-full h-10 text-xl text-white rounded-lg hover:bg-green-400 active:ring-2 active:ring-gray-200">
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            SendMoney
        </div>
    )
}