import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { createSlug } from "@/lib/utils";

export async function GET(request: Request,
  { params }: { params: { uuid: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { uuid: params.uuid },
      include: {
        workshops: {
          include: {
            tickets: {
              include: { registrations: true },
            },
          },
        },
        tickets: {
          include: { registrations: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found", status: 404, error: true },
        { status: 404 }
      );
    }

    let totalsold = 0;
    let totalamount = 0;
    let totalquantity = 0;

    for (const ticket of event.tickets || []) {
      const ticketsSold = ticket.registrations.length;
      totalsold += ticketsSold;
      totalamount += ticketsSold * ticket.price;
      totalquantity += ticket.quantity;
    }

    for (const workshop of event.workshops || []) {
      for (const ticket of workshop.tickets || []) {
        const ticketsSold = ticket.registrations.length;
        totalsold += ticketsSold;
        totalamount += ticketsSold * ticket.price;
        totalquantity += ticket.quantity;
      }
    }

    return NextResponse.json({
      status: 200,
      data: {
        totalsold,
        totalamount,
        totalquantity,
        event,
      },
      message: "Event found",
      error: null,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request,
  { params }: { params: { uuid: string } }) {
  try {
    const {
      title,
      overview,
      category,
      eventType,
      date,
      startTime,
      endTime,
      venue,
      address,
      eventImageUrl,
      city,
      state,
      country,
      postcode,
      isAllowWorkshop,
      isPaidFor,
    } = await request.json();

    const event = await prisma.event.findUnique({ where: { uuid: params.uuid } });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found", error: true, status: 404 },
        { status: 404 }
      );
    }

    const newSlug = createSlug(title);
    if (event.title !== title) {
      const existingEvent = await prisma.event.findUnique({ where: { slug: newSlug } });
      if (existingEvent) {
        return NextResponse.json(
          { message: "Another event exists with a similar name", error: true, status: 400 },
          { status: 400 }
        );
      }
    }

    if (!date || !startTime || !endTime) {
      return NextResponse.json(
        { message: "Invalid date or time format", error: true, status: 400 },
        { status: 400 }
      );
    }

    const fullStartTime = new Date(`${date}T${startTime}:00`);
    const fullEndTime = new Date(`${date}T${endTime}:00`);

    const updatedEvent = await prisma.event.update({
      where: { uuid: params.uuid },
      data: {
        title,
        slug: newSlug,
        overview,
        category,
        eventType,
        date: new Date(date),
        startTime: fullStartTime,
        endTime: fullEndTime,
        venue,
        address,
        eventImageUrl,
        city,
        state,
        country,
        postcode,
        isAllowWorkshop: isAllowWorkshop ?? false,
        isPaidFor: isPaidFor ?? false,
      },
    });

    return NextResponse.json({
      message: "Event updated successfully",
      data: updatedEvent,
      status: 200,
      error: false,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event", error: true, status: 500 },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request,
  { params }: { params: { uuid: string } }) {
  try {
    const event = await prisma.event.findUnique({ where: { uuid: params.uuid } });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    await prisma.event.delete({ where: { uuid: params.uuid } });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
