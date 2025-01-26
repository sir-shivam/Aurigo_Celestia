import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";

// Connect to the database
await connectDB();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "Email and password are required" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
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

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      }),
      { headers, status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred during login" }),
      { status: 500 }
    );
  }
}
