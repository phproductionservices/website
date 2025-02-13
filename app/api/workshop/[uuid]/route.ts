import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Workshop } from "@/lib/database/entities/workshop.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const workshopRepo = db.getRepository(Workshop);

    const workshop = await workshopRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["event", "ticket", "registrations", "speakers"],
    });

    if (!workshop) {
      return NextResponse.json(
        { error: "Workshop not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(workshop);
  } catch (error) {
    console.error("Error fetching workshop:", error);
    return NextResponse.json(
      { error: "Failed to fetch workshop" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { 
      title,
      startTime,
      endTime,
      description,
      isPaidFor,
      eventId,
      ticketId
    } = await request.json();
    
    const db = await initializeDB();
    const workshopRepo = db.getRepository(Workshop);

    const workshop = await workshopRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!workshop) {
      return NextResponse.json(
        { error: "Workshop not found" },
        { status: 404 }
      );
    }

    Object.assign(workshop, {
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      description,
      isPaidFor,
      event: eventId ? { id: eventId } : workshop.event,
      ticket: ticketId ? { id: ticketId } : workshop.ticket
    });

    await workshopRepo.save(workshop);

    return NextResponse.json(workshop);
  } catch (error) {
    console.error("Error updating workshop:", error);
    return NextResponse.json(
      { error: "Failed to update workshop" },
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
    const workshopRepo = db.getRepository(Workshop);

    const workshop = await workshopRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!workshop) {
      return NextResponse.json(
        { error: "Workshop not found" },
        { status: 404 }
      );
    }

    await workshopRepo.softRemove(workshop);

    return NextResponse.json({ message: "Workshop deleted successfully" });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    return NextResponse.json(
      { error: "Failed to delete workshop" },
      { status: 500 }
    );
  }
}