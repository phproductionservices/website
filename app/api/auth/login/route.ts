import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { UserRegistration } from "@/lib/database/entities/userRegistration.entity";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const db = await initializeDB();
    const userRepo = db.getRepository(UserRegistration);

    // Find user by email
    const user = await userRepo.findOne({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please sign up." },
        { status: 404 }
      );
    }

    // Verify password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        sub: user.uuid,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "3h" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login successful!",
      data: {
        user: userWithoutPassword,
        access_token: token
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
