import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Ticket } from "@/lib/database/entities/ticket.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const ticketRepo = db.getRepository(Ticket);

    const ticket = await ticketRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["event", "registrations", "workshops"],
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
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
      type,
      name,
      price,
      quantity,
      salesStartDate,
      salesEndDate,
      eventId
    } = await request.json();
    
    const db = await initializeDB();
    const ticketRepo = db.getRepository(Ticket);

    const ticket = await ticketRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    Object.assign(ticket, {
      type,
      name,
      price,
      quantity,
      salesStartDate: new Date(salesStartDate),
      salesEndDate: new Date(salesEndDate),
      event: eventId ? { id: eventId } : ticket.event
    });

    await ticketRepo.save(ticket);

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
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
    const ticketRepo = db.getRepository(Ticket);

    const ticket = await ticketRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    await ticketRepo.softRemove(ticket);

    return NextResponse.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json(
      { error: "Failed to delete ticket" },
      { status: 500 }
    );
  }
}