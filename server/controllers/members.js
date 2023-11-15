import Members from "../models/members.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

export const getPermissions = async (req, res) => {
  try {
    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const user = await Members.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = {};

    if (user.email) {
      userData.email = user.email;
    } else {
      userData.email = ""; // Return an empty string for email if it doesn't exist
    }

    if (user.first_name) {
      userData.first_name = user.first_name;
    } else {
      userData.first_name = ""; // Return an empty string for first_name if it doesn't exist
    }

    res.json({ userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const user = await Members.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
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

export const updatingMembersDetails = async (req, res) => {
  const { first_name, last_name, email, phone, gender, password, role } =
    req.body;

  const accessToken = req.user;
  const user_id = accessToken.userId.id;

  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/g;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const member = await Members.findByPk(user_id);

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
      where: { id: user_id },
    });

    res.status(200).json({ message: "Member updated", updatedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
