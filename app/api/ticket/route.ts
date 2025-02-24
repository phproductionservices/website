import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Ticket } from "@/lib/database/entities/ticket.entity";
import { Event } from "@/lib/database/entities/event.entity";
import { TicketType } from "@/lib/base";

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
    const { tickets, uuid } = await request.json();

    if (!Array.isArray(tickets) || tickets.length === 0) {
      return NextResponse.json(
        { message: "Tickets is required", status: 400, error: true },
        { status: 400 }
      );
    }

    const db = await initializeDB();
    const ticketRepo = db.getRepository(Ticket);
    const eventRepo = db.getRepository(Event);

    // Find the event by UUID
    const event = await eventRepo.findOne({ where: { uuid } });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found", status: 404, error: true },
        { status: 404 }
      );
    }

    const createdTickets = [];
    const errors = [];

    for (const ticketData of tickets) {
      const { type, name, price, quantity } = ticketData;

      // Validate ticket type
      if (!Object.values(TicketType).includes(type)) {
        errors.push({ message: `Invalid ticket type: ${type}`, ticketData });
        continue; // Skip this ticket and move to the next
      }

      // Validate price and quantity
      if (price < 0) {
        errors.push({ message: `Invalid price for ticket: ${price}`, ticketData });
        continue;
      }
      if (quantity <= 0) {
        errors.push({ message: `Invalid quantity for ticket: ${quantity}`, ticketData });
        continue;
      }

      // Create and save the ticket
      const ticket = ticketRepo.create({
        type,
        name,
        price,
        quantity,
        event: { id: event.id },
        registrations: [],
        workshops: {},
      });

      await ticketRepo.save(ticket);
      createdTickets.push(ticket);
    }

    return NextResponse.json(
      { message: "Tickets created successfully", data: createdTickets, status: 201 },
      { status: 201 }
    );

    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Some tickets could not be created", createdTickets, errors, status: 207 }, // 207: Multi-Status
        { status: 207 }
      );
    }

    
  } catch (error) {
    console.error("Error creating tickets:", error);
    return NextResponse.json(
      { message: "Failed to create tickets", error: true, status: 500 },
      { status: 500 }
    );
  }
}
