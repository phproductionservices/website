import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({
      include: {
        event: true,
        tickets: {
          include: {
            registrations: true,
          }
        },
        speakers: true,
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(workshops);
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

    const event = await prisma.event.findFirst({ where: { uuid: uuid } });

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

      if (!title || !date || !startTime || !endTime || !description) {
        errors.push({ message: "Missing required workshop fields", workshopData });
        continue;
      }

      const workshop = await prisma.workshop.create({
        data: {
          title,
          date: new Date(date).toISOString(),
          startTime,
          endTime,
          description,
          isPaidFor,
          eventId: event.id,
        },
      });

      if (Array.isArray(speakers) && speakers.length > 0) {
        await prisma.speaker.createMany({
          data: speakers.map(speaker => ({
            name: speaker.name,
            description: speaker.description,
            imageUrl: speaker.imageUrl || null,
            workshopId: workshop.id,
          })),
        });
      }

      if (Array.isArray(tickets) && tickets.length > 0) {
        for (const ticketData of tickets) {
          const { type, name, ticketPrice, ticketQuantity } = ticketData;

          if (!name || !type || ticketPrice === undefined || ticketQuantity === undefined) {
            errors.push({ message: "Missing required ticket fields", ticketData });
            continue;
          }

          if (ticketPrice <= 0 || ticketQuantity <= 0) {
            errors.push({ message: `Invalid price or quantity for ticket: ${name}`, ticketData });
            continue;
          }

          await prisma.ticket.create({
            data: {
              type,
              name,
              price: Number(ticketPrice),
              quantity: Number(ticketQuantity),
              workshopId: workshop.id,
            },
          });
        }
      }

      createdWorkshops.push(workshop);
    }

    return NextResponse.json({
      status: 201,
      message: "Workshops created successfully",
      data: createdWorkshops,
      errors: errors.length ? errors : null,
    });
  } catch (error) {
    console.error("Error creating workshop:", error);
    return NextResponse.json(
      { message: "Failed to create workshop", status: 500, error: true },
      { status: 500 }
    );
  }
}
