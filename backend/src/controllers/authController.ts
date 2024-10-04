import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const envEmail = process.env.USER_EMAIL;
    const envPassword = process.env.USER_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (email !== envEmail) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    if (password !== envPassword) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ email }, jwtSecret as string, { expiresIn: "1h" });

    res.json({ token });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
    return;
  }
};
