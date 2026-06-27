import mongoose from "mongoose";
const UserSChema = new mongoose.Schema({

    name: String,
    password: { type: String, required: true }
})

const User = mongoose.model("User", UserSChema)

export default User