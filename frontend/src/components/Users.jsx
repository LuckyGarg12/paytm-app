import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const token = localStorage.getItem("token")
    let prevTimeoutId = null;

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/search?filter=${filter}`, { headers: { "Authorization": "Bearer " + token } })
            .then(response => {
                setUsers(response.data.users)
            })
    }, [filter])

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2 mb-4">
                <input onChange={
                    (e) => {
                        clearTimeout(prevTimeoutId);
                        prevTimeoutId = setTimeout(() => {
                            setFilter(e.target.value)
                        }, 200);
                    }
                } placeholder="Search users..." type="text" className="w-full px-2 py-1 border rounded border-slate-200">
                </input>
            </div>
            <div>
                {users.map((user) => <User key={user._id} user={user} />)}
            </div>
        </>
    )

}

function User({ user }) {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between">
            <div className="flex mb-2">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
                    <div className="flex flex-col justify-center text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send Money"} onClick={(e)=>{
                    
                }} />
            </div>
        </div>
    )
}
