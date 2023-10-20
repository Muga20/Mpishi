import Members from "../models/members.js";
import bcrypt from "bcrypt";
import { issueAccessToken, issueRefreshToken } from "../middleware/auth.js";

export const logInMembers = async (req, res) => {

  const { username, password } = req.body;


  try {
    const user = await Members.findOne({ where: { username: username } });

    if (!user) {
      return res.sendStatus(400); // Return a 400 Bad Request status when the user is not found.
    }

    const dbPassword = user.password;

    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
      return res.sendStatus(401); // Return a 401 Unauthorized status for incorrect passwords.
    }

    // Password is correct; issue access and refresh tokens and return them in the response.
    const accessToken = issueAccessToken(user);
    const refreshToken = issueRefreshToken(user);

    res.status(200).json({
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(500); // Return a 500 Internal Server Error for unexpected errors.
  }
};
