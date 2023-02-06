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

export const getAllMembers = async (req, res) => {
  try {
    const listAllMembers = await Members.findAll();
    res.json(listAllMembers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getMembersById = async (req, res) => {
  try {
    const getAllById = await Members.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(getAllById[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createMembers = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await Members.findOne({
      where: { username: username },
    });

    if (existingUser) {
      return res.status(400).send({ message: "Username already exists" });
    }

    if (password.length < 5) {
      return res.status(400).send({ message: "Password must be at least 5 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const member = await Members.create({
      username,
      password: hash,
      role,
    });
    const token = createToken(member.id);
    res.status(200).send({
      username: member.username,
      token,
      message: "User Successfully created",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};



export const logInMembers = async (req, res) => {
  const { username, password } = req.body;

  const user = await Members.findOne({ where: { username: username } });

  if (!user) return res.sendStatus(400);

  const dbPassword = user.password;

  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      return res.sendStatus(401);
      // res
      //   .json({ error: "Wrong Username and Password Combination!" });
      //   console.log("logInMembers");
    } else {
      const token = createToken(
        user.id,
        user.username,
        user.first_name,
        user.last_name,
        user.email,
        user.phone,
        user.gender,
        user.image,
        user.role
      );
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        image: user.image,
        phone: user.phone,
        gender:user.gender,
        token,
      });
    }
  });
};

export const updateMembers = async (req, res) => {
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/g;
  const { first_name, last_name, email, password, phone, gender,  role } = req.body;

  // if (!first_name || !last_name || !email || !phone || !gender) {
  //   return res.sendStatus(400);
  // }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const member = await Members.findOne({ where: { id: req.params.id } });
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    let update = {};

    if (first_name) {
      update.first_name = first_name;
    }
    if (last_name) {
      update.last_name = last_name;
    }
    if (email) {
      update.email = email;
    }
    if (phone) {
      update.phone = phone;
    }
    if (gender) {
      update.gender = gender;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      update.password = hash;
    }
    if (role) {
      update.role = role;
    }
    if (req.file) {
      update.image = req.file.path;
    }

    const updatedMember = await Members.update(update, {
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Member updated", updatedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteMembers = async (req, res) => {
  try {
    await Members.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "User Successfully Deleted",
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


export const updatingMembersDetails = async (req, res) => {
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/g;
  const { first_name, last_name, email,phone, gender, } = req.body;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const member = await Members.findOne({ where: { id: req.params.id } });
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    let update = {};

    if (first_name) {
      update.first_name = first_name;
    }
    if (last_name) {
      update.last_name = last_name;
    }
    if (email) {
      update.email = email;
    }
    if (phone) {
      update.phone = phone;
    }
    if (gender) {
      update.gender = gender;
    }
    if (req.file) {
      update.image = req.file.path;
    }

    const updatedMember = await Members.update(update, {
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Member updated", updatedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
