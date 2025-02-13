import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { State } from "@/lib/database/entities/state.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const stateRepo = db.getRepository(State);

    const state = await stateRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["events"],
    });

    if (!state) {
      return NextResponse.json(
        { error: "State not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(state);
  } catch (error) {
    console.error("Error fetching state:", error);
    return NextResponse.json(
      { error: "Failed to fetch state" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { name } = await request.json();
    
    const db = await initializeDB();
    const stateRepo = db.getRepository(State);

    const state = await stateRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!state) {
      return NextResponse.json(
        { error: "State not found" },
        { status: 404 }
      );
    }

    state.name = name;
    await stateRepo.save(state);

    return NextResponse.json(state);
  } catch (error) {
    console.error("Error updating state:", error);
    return NextResponse.json(
      { error: "Failed to update state" },
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
    const stateRepo = db.getRepository(State);

    const state = await stateRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!state) {
      return NextResponse.json(
        { error: "State not found" },
        { status: 404 }
      );
    }

    await stateRepo.softRemove(state);

    return NextResponse.json({ message: "State deleted successfully" });
  } catch (error) {
    console.error("Error deleting state:", error);
    return NextResponse.json(
      { error: "Failed to delete state" },
      { status: 500 }
    );
  }
}