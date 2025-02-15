import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { UserRegistration } from "@/lib/database/entities/userRegistration.entity";
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password, fullName, phone, role } = await request.json();

    const db = await initializeDB();
    const userRepo = db.getRepository(UserRegistration);

    // Check if user already exists
    const existingUser = await userRepo.findOne({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = userRepo.create({
      email,
      password,
      fullName,
      phone,
      role
    });

    await userRepo.save(user);

    // Generate JWT token
    const token = jwt.sign(
      { 
        sub: user.uuid,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '3h' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      access_token: token
    }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}