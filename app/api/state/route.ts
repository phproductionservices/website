import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { State } from "@/lib/database/entities/state.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const stateRepo = db.getRepository(State);

    const states = await stateRepo.find({
      relations: ["events"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
    return NextResponse.json(
      { error: "Failed to fetch states" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const db = await initializeDB();
    const stateRepo = db.getRepository(State);

    const state = stateRepo.create({ 
      name,
      events: []
    });

    await stateRepo.save(state);

    return NextResponse.json(state, { status: 201 });
  } catch (error) {
    console.error("Error creating state:", error);
    return NextResponse.json(
      { error: "Failed to create state" },
      { status: 500 }
    );
  }
}