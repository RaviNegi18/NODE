import User from "../schema/user.schema.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

// REGISTER SERVICE
export const register = async (userData) => {
  const { username, email, password } = userData;

  // 1. Check user exists
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // 4. Generate token
  const token = Jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "7d" },
  );

  return {
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    token,
  };
};

// LOGIN SERVICE
export const login = async (userData) => {
  const { email, password } = userData;

  // 1. Find user
  const existing = await User.findOne({ email });
  if (!existing) {
    throw new Error("User not found");
  }

  // 2. Match passwords
  const match = await bcrypt.compare(password, existing.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  // 3. Generate JWT

  const token = Jwt.sign(
    {
      id: existing._id,
      username: existing.username,
      email: existing.email,
    },

    process.env.SECRET_TOKEN,
    {
      expiresIn: "7d",
    },
  );

  return {
    message: "Login successful",
    user: {
      id: existing._id,
      username: existing.username,
      email: existing.email,
    },
    token,
  };
};
