import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    token?: string;
    resetToken?:string | undefined,
    resetTokenExpiry?: number | undefined
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false, 
        },
        token: {
            type: String,
        },
        resetToken:{
            type:String,
            default: undefined 
        },
        resetTokenExpiry :{
            type:Date,
            default: undefined 
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
