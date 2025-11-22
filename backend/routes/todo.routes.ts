import express, { Router } from "express";
import { createTodo,updateTodo,deleteTodo,getTodo } from "../controller/todo.controller";
import { authenticate } from "../middlewares/authorised";

const todoRouter: Router = express.Router();

todoRouter.post("/create", authenticate, createTodo);
todoRouter.get("/fetch", authenticate, getTodo);
todoRouter.put("/update/:id", authenticate, updateTodo);
todoRouter.delete("/delete/:id", authenticate, deleteTodo);

export default todoRouter;
