export interface ButtonProps {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const TodoButton : React.FC<ButtonProps> =({
    label,onClick,className=""
})=>{
    return (
        <button onClick={onClick} className={` px-6 mx-4  py-2 text-md rounded-md ${className}`}>
            {label}
        </button>
    )
}
export default TodoButton;