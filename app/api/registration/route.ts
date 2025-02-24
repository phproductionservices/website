import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Registration } from "@/lib/database/entities/registration.entity";
import { data } from "autoprefixer";
import { createTicketReference } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const registrationRepo = db.getRepository(Registration);

    const registrations = await registrationRepo.find({
      relations: ["user", "event", "ticket", "workshop"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, tickets } = await request.json();

    if (!firstName || !lastName || !email || !phone || !Array.isArray(tickets) || tickets.length === 0) {
      return NextResponse.json({ message: "Invalid request data", status: 400, errors: true }, { status: 400 });
    }

    const db = await initializeDB();
    const registrationRepo = db.getRepository(Registration);

    const createdRegistrations = tickets.map(ticket => {
      return registrationRepo.create({
        firstName,
        lastName,
        email,
        phone,
        amount: ticket.amount,
        name: ticket.name,
        ticketRef: createTicketReference(firstName, ticket.ticketId),
        pricePerTicket: ticket.pricePerTicket,
        quantity: ticket.quantity,
        type: ticket.type,
        ticket: ticket.ticketId ? { id: ticket.ticketId } : null,
      });
    });

    await registrationRepo.save(createdRegistrations);

    return NextResponse.json({
      data: createdRegistrations,
      status: 201,
      message: "Registration created successfully",
      errors: false
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { message: "Failed to create registration", status: 500, errors: true },
      { status: 500 }
    );
  }
}
