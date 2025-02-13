import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { User } from "@/lib/database/entities/user.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const userRepo = db.getRepository(User);

    const user = await userRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["registrations"],
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { username, email, role, name, phone } = await request.json();
    
    const db = await initializeDB();
    const userRepo = db.getRepository(User);

    const user = await userRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if updated username/email conflicts with existing users
    const existingUser = await userRepo.findOne({
      where: [
        { username, uuid: Not(params.uuid) },
        { email, uuid: Not(params.uuid) }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    Object.assign(user, {
      username,
      email,
      role,
      name,
      phone
    });

    await userRepo.save(user);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const userRepo = db.getRepository(User);

    const user = await userRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await userRepo.softRemove(user);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}