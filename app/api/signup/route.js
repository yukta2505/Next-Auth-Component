import dbConnect from "../../lib/dbConnect.js";
import User from "../../lib/models/User.js";

import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();  // parse JSON
    const { name, email, password } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    await dbConnect();  // connect to MongoDB

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User created", user: newUser }), { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
