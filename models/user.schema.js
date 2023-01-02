import mongoose from "mongoose"
import AuthRoles from "../utils/authRoles";

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
    roles: {
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

export default mongoose.model("User", UserSchema);