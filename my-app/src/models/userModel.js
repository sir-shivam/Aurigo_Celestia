import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a username"],
        unique:true,
    },
    email:{
        type: String,
        required: [true , "Please provide a email"],
        unique: true,

},
    password:{
        type: String,
        required: [true , "Pleaseprovide a password"],
    },
    
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry:Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;