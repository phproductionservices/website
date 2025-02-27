import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Event } from "@/lib/database/entities/event.entity";
import { createSlug } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const eventRepo = db.getRepository(Event);

    // ✅ Fetch event with tickets and registrations
    const event = await eventRepo.findOne({
      where: { uuid: params.uuid },
      relations: [
        "workshops",
        "workshops.ticket",
        "workshops.ticket.registrations",
        "tickets",
        "tickets.registrations",
      ],
      select: [
        "id",
        "uuid",
        "created_at",
        "updated_at",
        "slug",
        "title",
        "category",
        "overview",
        "eventType",
        "date",
        "startTime",
        "endTime",
        "venue",
        "address",
        "postcode",
        "eventImageUrl",
        "isAllowWorkshop",
        "status",
        "isPaidFor",
        "city",
        "state",
        "country",
      ],
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found", status: 404, error: true },
        { status: 404 }
      );
    }

    // ✅ Calculate ticket metrics
    let totalsold = 0;
    let totalamount = 0;
    let totalquantity = 0;

    // Loop through event tickets
    for (const ticket of event.tickets || []) {
      const ticketsSold = ticket.registrations.length;
      totalsold += ticketsSold;
      totalamount += ticketsSold * ticket.price;
      totalquantity += ticket.quantity;
    }

    // Loop through workshop tickets
    for (const workshop of event.workshops || []) {
      for (const ticket of workshop.ticket || []) {
        const ticketsSold = ticket.registrations.length;
        totalsold += ticketsSold;
        totalamount += ticketsSold * ticket.price;
        totalquantity += ticket.quantity;
      }
    }

    // ✅ Return structured response
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

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } }
) {
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
      isPaidFor
    } = await request.json();

    const db = await initializeDB();
    const eventRepo = db.getRepository(Event);

    // Find event by UUID
    const event = await eventRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found", error: true, status: 404 },
        { status: 404 }
      );
    }

    // Check for duplicate slug (if title is changing)
    const newSlug = createSlug(title);
    if (event.title !== title) {
      const existingEvent = await eventRepo.findOne({ where: { slug: newSlug } });
      if (existingEvent) {
        return NextResponse.json(
          { message: "Another event exists with a similar name", error: true, status: 400 },
          { status: 400 }
        );
      }
    }

    // Validate date and times
    if (!date || !startTime || !endTime) {
      return NextResponse.json(
        { message: "Invalid date or time format", error: true, status: 400 },
        { status: 400 }
      );
    }

    const fullStartTime = new Date(`${date}T${startTime}:00`);
    const fullEndTime = new Date(`${date}T${endTime}:00`);

    // Update only the event fields (excluding workshops & tickets)
    Object.assign(event, {
      title,
      slug: newSlug, // Update slug if title changes
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
    });

    await eventRepo.save(event);

    return NextResponse.json({
      message: "Event updated successfully",
      data: event,
      status: 200,
      error: false
    });

  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event", error: true, status: 500 },
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
    const eventRepo = db.getRepository(Event);

    const event = await eventRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    await eventRepo.softRemove(event);

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}