import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Speaker } from "@/lib/database/entities/speaker.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const speakerRepo = db.getRepository(Speaker);

    const speaker = await speakerRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["workshop"],
    });

    if (!speaker) {
      return NextResponse.json(
        { error: "Speaker not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(speaker);
  } catch (error) {
    console.error("Error fetching speaker:", error);
    return NextResponse.json(
      { error: "Failed to fetch speaker" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { name, description, imageUrl, workshopId } = await request.json();
    
    const db = await initializeDB();
    const speakerRepo = db.getRepository(Speaker);

    const speaker = await speakerRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!speaker) {
      return NextResponse.json(
        { error: "Speaker not found" },
        { status: 404 }
      );
    }

    Object.assign(speaker, {
      name,
      description,
      imageUrl,
      workshop: workshopId ? { id: workshopId } : speaker.workshop
    });

    await speakerRepo.save(speaker);

    return NextResponse.json(speaker);
  } catch (error) {
    console.error("Error updating speaker:", error);
    return NextResponse.json(
      { error: "Failed to update speaker" },
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
    const speakerRepo = db.getRepository(Speaker);

    const speaker = await speakerRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!speaker) {
      return NextResponse.json(
        { error: "Speaker not found" },
        { status: 404 }
      );
    }

    await speakerRepo.softRemove(speaker);

    return NextResponse.json({ message: "Speaker deleted successfully" });
  } catch (error) {
    console.error("Error deleting speaker:", error);
    return NextResponse.json(
      { error: "Failed to delete speaker" },
      { status: 500 }
    );
  }
}