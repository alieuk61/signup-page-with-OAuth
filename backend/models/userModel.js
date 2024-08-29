import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        optional: true
    },
    password: {
        type: String,
        trim: true,
        required: function() {
            return !this.googleId; // Password is required if no Google ID is present
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstname: {
        type: String,
        optional: true,
        trim: true
    },
    surname: {
        type: String,
        optional: true,
        trim: true
    },
    googleId: {
        type: String,
        unique: true, // Ensure the Google ID is unique
        sparse: true  // Allows the field to be unique but still optional
    }
})

const User = mongoose.model('User', userSchema)
export default User

