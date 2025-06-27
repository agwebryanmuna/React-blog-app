import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    img: { type: String },
    posts: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema)

export default User;
