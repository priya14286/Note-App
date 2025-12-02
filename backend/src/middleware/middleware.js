import jwt from "jsonwebtoken";
import User from "../models/user.js";

const middleware = async (req, res, next) => {
  try {
    // 1. Check token exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, "secretkeynoteapp123@");
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // 3. Fetch user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // 4. Add user info in req.user
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (err) {
    console.log("Middleware Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server Error in auth middleware, please login again" });
  }
};

export default middleware;
