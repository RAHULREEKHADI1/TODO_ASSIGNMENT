import { Request, Response } from "express";
import Todo from "../model/todo.model";

export const createTodo = async (req: Request, res: Response) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            completed: req.body.completed,
            user: req.user?._id, 
        });

        const newTodo = await todo.save();

        res.status(201).json({
            message: "Todo created successfully",
            newTodo,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error occurred in todo creation",
        });
    }
};

export const getTodo = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({ user: req.user?._id });

        res.status(200).json({
            message: "Todo fetched successfully",
            todos,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error occurred in todo fetching",
        });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json({
            message: "Todo updated successfully",
            todo,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error occurred in updating the todo",
        });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error occurred in deleting todo",
        });
    }
};
