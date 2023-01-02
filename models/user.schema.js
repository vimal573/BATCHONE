import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name must be less then 50"]
    }
})