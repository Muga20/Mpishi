import Members from "../models/members.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
//get config vars
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createToken = (
  id,
  first_name,
  username,
  last_name,
  email,
  phone,
  gender,
  image,
  role
) => {
  return jwt.sign(
    {
      id: id,
      username: username,
      first_name: first_name,
      last_name: last_name,
      gender:gender,
      phone:phone,
      email: email,
      image: image,
      role: role,

    },
    process.env.TOKEN_SECRET,
    { expiresIn: "2d" }
  );
};


export const resetPassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const encryptPassword = await bcrypt.hash(newPassword, 10);
  
    if (newPassword === confirmPassword) {
      console.log("f");
    } else {
      return res.status(400).json({
        success: false,
        message: "Password Does Not Much",
      });
    }
  
    try {
      const updatedUser = await Members.update(
        { password: encryptPassword },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  



export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      if (!email) {
        return res.status(40).json({
          success: false,
          message: "Email Does Not Exist",
        });
      }
  
      const user = await Members.findOne({ where: { email: email } });
      if (!user) {
        return res.sendStatus(400);
      } else {
        //create a nodeMailer Transport
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "murimib08@gmail.com",
            pass: "fgpsdfeuzkfnqlgf",
          },
        });
        //email option
        await transport.sendMail({
          from: "murimib08@gmail.com",
          to: `${email}`,
          subject: "Forgot password link",
          html:
            '<p>You requested for reset password, You have this email because you have request to recover your account Click on the following link bellow to proceed the link will expire in 5 min <a href="http://localhost:3000/resetPassword/' +
            user.id +
            '">Forgot Password</a> if you did not request this please ignore this email and your password will remain the same</p>',
        });
  
        transport.sendMail(mailOption, (err, response) => {
          if (err) {
            console.log("There was an error", err);
          } else {
            console.log("There was a response ", response);
            res.status(200).json("recovery email sent ");
          }
        });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  