function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    name,
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
        />
    );
}

export default Input;