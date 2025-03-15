import ButtonWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";


export default function Signin() {
    return (
        <>
            <div className="bg-slate-300 flex justify-center h-screen">
                <div className="flex flex-col justify-center">
                    <div className="bg-white rounded-lg w-80 p-2 h-max px-4 text-center">
                        <Heading label={"Sign In"} />
                        <SubHeading label={"Enter your information to login"} />
                        <InputBox inId={"username"} refer={username} label={"Email"} placeholder={"example@xyz.com"} type={"email"} />
                        <InputBox inId={"password"} refer={password} label={"Password"} placeholder={"Enter Password"} type="password" />
                        <div className="pt-4">
                            <Button label="Sign In" onClick={() => {

                            }} />
                        </div>
                        <ButtonWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </>
    )
}