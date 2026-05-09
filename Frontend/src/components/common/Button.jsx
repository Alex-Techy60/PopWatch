function Button({
    children,
    type = "button",
    onClick,
    className = "",
    disabled = false,
}) {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full
                bg-red-600
                hover:bg-red-700
                transition-all
                duration-300
                py-3
                rounded-xl
                font-semibold
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;