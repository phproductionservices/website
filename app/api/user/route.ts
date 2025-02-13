import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { User } from "@/ boltAction type="file" filePath="app/api/user/route.ts">
import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { User } from "@/lib/database/entities/user.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const userRepo = db.getRepository(User);

    const users = await userRepo.find({
      relations: ["registrations"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { username, email, role, name, phone } = await request.json();

    const db = await initializeDB();
    const userRepo = db.getRepository(User);

    // Check if user with same username or email exists
    const existingUser = await userRepo.findOne({
      where: [{ username }, { email }]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    const user = userRepo.create({
      username,
      email,
      role,
      name,
      phone,
      registrations: []
    });

    await userRepo.save(user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}