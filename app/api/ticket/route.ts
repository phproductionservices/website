import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Ticket } from "@/lib/database/entities/ticket.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const ticketRepo = db.getRepository(Ticket);

    const tickets = await ticketRepo.find({
      relations: ["event", "registrations", "workshops"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const ticket = ticketRepo.create({
      type,
      name,
      price,
      quantity,
      salesStartDate: new Date(salesStartDate),
      salesEndDate: new Date(salesEndDate),
      event: eventId ? { id: eventId } : null,
      registrations: [],
      workshops: []
    });

    await ticketRepo.save(ticket);

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}