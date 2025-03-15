export default function InputBox({inId, label, placeholder, refer, type }) {
    return(
        <div>
            <div className="test-sm font-medium text-left py-2">
                {label}
            </div>
            <input id={inId} ref={refer} placeholder={placeholder} type={type} className="w-full border border-slate-200 rounded h-10 px-2" />
        </div>
    )
}