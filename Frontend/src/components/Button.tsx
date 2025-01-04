import { ReactElement } from "react"
interface ButtonProps {
    variant: "primary" | "secondary",
    text: string,
    startIcon?: ReactElement
    OnClick?: () => void
    fullWidth?: boolean
    loading?:boolean
}

const variantClasses = {
    "primary": "bg-purple-600 text-white ",
    "secondary": "bg-purple-200 text-purple-600"
}
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"
export function Button({ variant, text, startIcon, OnClick, fullWidth ,loading}: ButtonProps) {

    return <button onClick={OnClick}
        
        className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""}${loading?" opacity-45":""}`}
        disabled={loading}>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
    </button>
}