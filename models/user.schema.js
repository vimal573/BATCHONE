import mongoose from "mongoose"
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from 'crypto';
import Config from "../config";

const UserSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name must be less then 50"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password should be at least 8 characters"],
        select: false
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date

},
{
    timestamps: true
}
);

// encrypt password
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

// add more feateures directly to user schema

UserSchema.methods = ({
    //Compare passward
    comparePassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },

    //Generate JWT token
    getJwtToken: function() {
        return JWT.sign({
            _id: this._id,
            role: this.role
        }),
        Config.JWT_SECRET,
        {
            expiresIn: Config.JWT_EXPIRY
        }
    }


})

export default mongoose.model("User", UserSchema);