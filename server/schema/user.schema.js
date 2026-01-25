import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    minlength: [3, "Username must be atleast 3 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is reuired"],
    minlength: [6, "password must be atleast 6 characters"],
  },
});

const User=new mongoose.model('User',userSchema)
export default User;
