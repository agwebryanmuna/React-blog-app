import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  // req.auth passed from clerkmiddleware(). Should contain the token
  const {userId:clerkUserId} = req.auth();

  if (!clerkUserId) return res.status(401).json("Not authenticated!");

  const user = await User.findOne({ clerkUserId });

  if (!user) return res.status(404).json("User not found!");
  req.user = user;
  next();
};

export default authMiddleware;
