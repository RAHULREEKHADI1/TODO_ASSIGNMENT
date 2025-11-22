import { useState } from "react";
import TodoButton from "./TodoButton";
import { FaTrash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface TodoProps {
    _id: string;
    title: string;
    completed: boolean;
}

const Todo = () => {

    const navigateTo = useNavigate();
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState<string | null>(null);

    const logout = async () => {
        try {
            await axios.get("http://localhost:4000/user/logout", {
                withCredentials: true,
            })
            toast.success("User logged out successfully")
            navigateTo("/login")
            localStorage.removeItem("jwt");
        }
        catch (error) {
            toast.error("Error logging out")
        }
    }


    const createTodo = async (): Promise<void> => {
        if (!newTodo.trim()) return;

        try {
            const response = await axios.post<{ newTodo: TodoProps }>(
                "http://localhost:4000/todo/create",
                {
                    title: newTodo,
                    completed: false,
                },
                { withCredentials: true }
            );

            setTodos([...todos, response.data.newTodo]);
            setNewTodo("");
        } catch (error) {
            const err = error as AxiosError;
            setError(err.message || "Failed to create todo");
        }
    };
    const toggleTodo = async (_id: string): Promise<void> => {
        
        const todo = todos.find((t) => t._id === _id);
        if (!todo) return;

        try {
            const response = await axios.put<{ todo: TodoProps }>(
                `http://localhost:4000/todo/update/${_id}`,
                {
                    ...todo,
                    completed: !todo.completed,
                },
                { withCredentials: true }
            );

            setTodos(todos.map((t) => (t._id === _id ? response.data.todo : t)));
        } catch (error) {
            const err = error as AxiosError;
            setError(err.message || "Failed to update todo status");
        }
    };
    const deleteTodo = async (_id: string): Promise<void> => {
        try {
            await axios.delete(
                `http://localhost:4000/todo/delete/${_id}`,
                { withCredentials: true }
            );

            setTodos(todos.filter((t) => t._id !== _id));
        } catch (error) {
            const err = error as AxiosError;
            setError(err.message || "Failed to delete todo");
        }
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="py-8 flex flex-col gap-12 w-[500px] ">
                <div className="flex justify-between">
                    <h2 className="text-4xl">Todo Application</h2>
                    <TodoButton label='Logout' className="bg-[#CF3620] py-3 m-0! text-white" onClick={logout} />
                </div>


                <div className="flex gap-4 items-center border border-[#E0E0E1] bg-[#E0E0E1] rounded-md " >
                    <input
                        className="py-3 px-4 flex-1 focus:outline-none  "
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new Todo"
                    />
                    <TodoButton
                        label="Add Todo"
                        onClick={() => createTodo()}
                        className="bg-[#CF3620] py-3 m-0! text-white"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {todos.map(todo => (
                        <div
                            key={todo._id}
                            className="flex justify-between items-center border rounded p-3"
                        >
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo._id)}
                                />
                                <span
                                    className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-[#4b4b4e]'}`}
                                >
                                    {todo.title}
                                </span>
                            </div>

                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Todo;
