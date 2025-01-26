import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";

// Connect to the database
await connectDB();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json(); // Parse the incoming JSON data

    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is already in use" }),
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const isSecure = process.env.NODE_ENV === "production";

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; ${
        isSecure ? "Secure;" : ""
      } SameSite=Strict`
    );

    // Respond with the new user data and token
    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred during registration" }),
      { status: 500 }
    );
  }
}
