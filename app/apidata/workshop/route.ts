import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Workshop } from "@/lib/database/entities/workshop.entity";
import { Event } from "@/lib/database/entities/event.entity";
import { Ticket } from "@/lib/database/entities/ticket.entity";

// Configure route for static export
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const workshopRepo = db.getRepository(Workshop);

    // Fetch workshops and include related entities
    const workshops = await workshopRepo.find({
      relations: ["event", "ticket", "registrations", "speakers"],
      order: { created_at: "DESC" },
    });

    // Ensure missing relations return empty arrays
    const workshopsWithRelations = workshops.map(workshop => ({
      ...workshop,
      registrations: workshop.registrations ?? [],
      speakers: workshop.speakers ?? [],
    }));

    return NextResponse.json(workshopsWithRelations);
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return NextResponse.json(
      { error: "Failed to fetch workshops" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
    const eventRepo = db.getRepository(Event);
    const ticketRepo = db.getRepository(Ticket);

    // Check if the event exists
    const event = await eventRepo.findOne({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check if the ticket exists (if provided)
    let ticket = null;
    if (ticketId) {
      ticket = await ticketRepo.findOne({ where: { id: ticketId } });
      if (!ticket) {
        return NextResponse.json(
          { error: "Ticket not found" },
          { status: 404 }
        );
      }
    }

    // Create new workshop
    const workshop = workshopRepo.create({ 
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      description,
      isPaidFor,
      event,
      ticket,
      registrations: [],
      speakers: []
    });

    await workshopRepo.save(workshop);

    return NextResponse.json(workshop, { status: 201 });
  } catch (error) {
    console.error("Error creating workshop:", error);
    return NextResponse.json(
      { error: "Failed to create workshop" },
      { status: 500 }
    );
  }
}
