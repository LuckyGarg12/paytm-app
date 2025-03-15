import { useRef } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import ButtonWarning from "../components/BottomWarning";

export default function Signup() {
    const firstName = useRef(null)
    const lastName = useRef(null)
    const username = useRef(null)
    const password = useRef(null)


    return(
        <>
            <div className="bg-slate-300 flex justify-center h-screen">
                <div className="flex flex-col justify-center">
                    <div className="bg-white rounded-lg w-80 p-2 h-max px-4 text-center">
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your infromation to create an account"} />
                        <InputBox inId={"firstName"} refer={firstName} label={"First Name"} placeholder={"John"} type={"text"} />
                        <InputBox inId={"lastName"} refer={lastName} label={"Last Name"} placeholder={"Doe"} type={"text"} />
                        <InputBox inId={"username"} refer={username} label={"Email"} placeholder={"example@xyz.com"} type={"email"} />
                        <InputBox inId={"password"} refer={password} label={"Password"} placeholder={"Enter Password"} type="password" />
                        <div className="pt-4">
                            <Button label="Sign Up" onClick={()=> {

                            }} />
                        </div>
                        <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                    </div>
                </div>
            </div>
        </>
    )
}