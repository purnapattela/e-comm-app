import mongoose from "mongoose";
import authRoles from '../utils/authRoles.js'

const userSchemas = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            maxLength: [50, 'name must be less than 50 chars'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minLength: [8, 'password must be atleast 8 chars'],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(authRoles),
            default: authRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    }, { timestamps: true }
)


export default mongoose.model('User', userSchemas)