import mongoose from "mongoose";

export async function connectToDb() {
    try {
        const uri = process.env.MONGO_URI as string;

        if (!uri) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}
