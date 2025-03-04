import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/database/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: any) {
  try {
    const { email, password, fullName, phone, role } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.userRegistration.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.userRegistration.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        role,
      },
    });

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

    return NextResponse.json(
      {
        user: userWithoutPassword,
        access_token: token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
