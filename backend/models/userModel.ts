import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    firstname: string,
    surname: string
  }

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    }
})

const user = mongoose.model<IUser>('User', userSchema)
export default user

