import mongoose from "mongoose";
import authRoles from '../utils/authRoles.js'
import bcrypt, { compare } from 'bcryptjs'

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


userSchemas.pre('save', async function (next) {
    // can not use arrow function because we need to reference 'this' keyword
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchemas.methods = {
    // compare Password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword,this.password)
    }
}

export default mongoose.model('User', userSchemas)