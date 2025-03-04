import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/database/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: any) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = await prisma.userRegistration.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found. Please sign up.", status: 404, error: true },
        { status: 404 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Incorrect password. Please try again.", status: 401, error: true },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
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
        access_token: token,
      },
      status: 200,
      error: false,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later.", status: 500, error: true },
      { status: 500 }
    );
  }
}