import Members from "../models/members.js";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
    try {
      const { username, password, role } = req.body;
  
      const existingUser = await Members.findOne({
        where: { username: username },
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
  
      if (password.length < 5) {
        return res.status(402).json({ message: "Password must be at least 6 characters long" });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const member = await Members.create({
        username: username,
        password: hash,
        role,
      });
      
      return res.status(200).json({
        message: "User successfully created",
      });

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  