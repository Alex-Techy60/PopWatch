import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            minLength: [3, "Username must be at least 3 characters"],
            maxLength: [30, "Username cannot exceed 30 characters"]
        }, 
        email: {
            type: String, 
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"]
        }, 
        fullName: {
            type: String, 
            required: true,
            trim: true, 
            index: true
        }, 
        avatar: {
            type: String, 
            required: true
        }, 
        coverImage: {
            type: String
        }, 
        watchHistory: [
            {
                type: Schema.Types.ObjectId, 
                ref: "Video"
            }
        ], 
        password: {
            type: String, 
            required: [true, 'Password is required'],
            minlength: [8, "Password must be at least 8 characters long"],
            validate: {
                validator: function(value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value);
                },
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            },
            select: false
        }, 
        refreshToken: {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true}
)

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        }, 
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)