import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        event: true,
        registrations: true,
        workshop: true,
      },
      orderBy: { created_at: "desc" },
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
        { message: "Tickets are required", status: 400, error: true },
        { status: 400 }
      );
    }

    const event = await prisma.event.findFirst({ where: { uuid: uuid } });

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

      console.log(" Creating ticket:", ticketData);

      if (price < 0) {
        errors.push({ message: `Invalid price for ticket: ${price}`, ticketData });
        break;
      }
      if (quantity <= 0) {
        errors.push({ message: `Invalid quantity for ticket: ${quantity}`, ticketData });
        break;
      }

      const ticket = await prisma.ticket.create({
        data: {
          type,
          name,
          price: Number(price),
          quantity: Number(quantity),
          eventId: event.id,
        },
      });

      createdTickets.push(ticket);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Some tickets could not be created", createdTickets, errors, status: 207 },
        { status: 207 }
      );
    }

    return NextResponse.json(
      { message: "Tickets created successfully", data: createdTickets, status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tickets:", error);
    return NextResponse.json(
      { message: "Failed to create tickets", error: true, status: 500 },
      { status: 500 }
    );
  }
}