import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Workshop } from "@/lib/database/entities/workshop.entity";
import { Event } from "@/lib/database/entities/event.entity";
import { Ticket } from "@/lib/database/entities/ticket.entity";
import { Speaker } from "@/lib/database/entities/speaker.entity";
import { TicketType } from "@/lib/base";

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
      // registrations: workshop.registrations ?? [],
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
    const { workshops, uuid } = await request.json();

    if (!Array.isArray(workshops) || workshops.length === 0) {
      return NextResponse.json(
        { message: "Workshops array is required", status: 400, error: true },
        { status: 400 }
      );
    }

    const db = await initializeDB();
    const workshopRepo = db.getRepository(Workshop);
    const eventRepo = db.getRepository(Event);
    const ticketRepo = db.getRepository(Ticket);
    const speakerRepo = db.getRepository(Speaker);

    // Check if the event exists
    const event = await eventRepo.findOne({ where: { uuid: uuid } });
    if (!event) {
      return NextResponse.json(
        { message: "Event not found", status: 404, error: true },
        { status: 404 }
      );
    }

    const createdWorkshops = [];
    const errors = [];

    for (const workshopData of workshops) {
      const { title, date, startTime, endTime, description, isPaidFor, speakers, tickets } = workshopData;

      // Validate required fields for workshop
      if (!title || !date || !startTime || !endTime || !description) {
        errors.push({ message: "Missing required workshop fields", workshopData });
        continue; // Skip this workshop
      }

      const workshopvalue = workshopRepo.create({
        title,
        date,
        startTime,
        endTime,
        description,
        isPaidFor,
        event: { id: event.id },
        speakers: [],
        ticket: [],
      });


      await workshopRepo.save(workshopvalue);

      // Process speakers only if available
      if (Array.isArray(speakers) && speakers.length > 0) {
        for (const speakerData of speakers) {
          const { name, description, imageUrl } = speakerData;

          if (!name || !description) {
            errors.push({ message: "Speaker name and description are required", speakerData });
            continue;
          }

          const speaker = speakerRepo.create({
            name,
            description,
            imageUrl: imageUrl || null, // Optional field
            workshop: { id: workshopvalue.id },
          });

          await speakerRepo.save(speaker);
        }
      }

      // Process tickets only if available
      if (Array.isArray(tickets) && tickets.length > 0) {
        for (const ticketData of tickets) {
          const { id, type, name, ticketPrice, ticketQuantity } = ticketData;

          // Validate required fields
          if (!name || !type || ticketPrice === undefined || ticketQuantity === undefined) {
            errors.push({ message: "Missing required ticket fields", ticketData });
            continue;
          }

          // Validate ticket type
          if (!Object.values(TicketType).includes(type)) {
            errors.push({ message: `Invalid ticket type: ${type}`, ticketData });
            continue;
          }

          // Validate price and quantity
          if (ticketPrice <= 0) {
            errors.push({ message: `Invalid price for ticket: ${ticketPrice}`, ticketData });
            continue;
          }
          if (ticketQuantity <= 0) {
            errors.push({ message: `Invalid quantity for ticket: ${ticketQuantity}`, ticketData });
            continue;
          }

          // Create and save the ticket
          const ticket = ticketRepo.create({
            type,
            name,
            price: ticketPrice,
            quantity: ticketQuantity,
            event: {},
            registrations: [],
            workshops: { id: workshopvalue.id },
          });

          await ticketRepo.save(ticket);
        }
      }

      const savedWorkshop = await workshopRepo.findOne({ where: { id: workshopvalue.id } });
      createdWorkshops.push(savedWorkshop);
    }

    return NextResponse.json({
      status: 201,
      message: "Workshop created successfully",
      data: createdWorkshops,
      errors: errors.length ? errors : null, // Include errors only if present
    });

  } catch (error) {
    console.error("Error creating workshop:", error);
    return NextResponse.json(
      { message: "Failed to create workshop", status: 500, error: true },
      { status: 500 }
    );
  }
}

