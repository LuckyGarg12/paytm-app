import { Link } from "react-router-dom";

export default function ButtonWarning({label, buttonText, to}) {
    return (
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link className="cursor-pointer underline pl-1" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}