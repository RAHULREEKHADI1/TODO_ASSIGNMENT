import express, { Application, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { connectToDb } from "./db/db";
import router from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,               // allow cookies
  })
);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});



// --- Start Server ---
const PORT = process.env.PORT || 5000;

app.use("/user",router);
app.use("/todo",todoRouter);

async function start() {
    await connectToDb();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();