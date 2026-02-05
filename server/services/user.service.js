import User from "../schema/user.schema.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return Jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return Jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER SERVICE
export const register = async (userData) => {
  const { username, email, password } = userData;

  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashed,
  });

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  return {
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    accessToken,
    refreshToken,
  };
};

// LOGIN SERVICE
export const login = async (userData) => {
  const { email, password } = userData;

  const existing = await User.findOne({ email });
  if (!existing) throw new Error("User not found");

  const match = await bcrypt.compare(password, existing.password);
  if (!match) throw new Error("Incorrect password");

  const accessToken = generateAccessToken(existing);
  const refreshToken = generateRefreshToken(existing);

  return {
    message: "Login successful",
    user: {
      id: existing._id,
      username: existing.username,
      email: existing.email,
    },
    accessToken,
    refreshToken,
  };
};
