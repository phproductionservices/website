import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Event } from "@/lib/database/entities/event.entity";
import { createSlug } from "@/lib/utils";

// Configure route for static export
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const eventRepo = db.getRepository(Event);

    // Fetch events and include related entities (workshops, registrations, tickets)
    const events = await eventRepo.find({
      relations: ["workshops", "registrations", "tickets"],
      order: { created_at: "DESC" },
    });

    // Ensure empty arrays for missing relations
    const eventsWithRelations = events.map(event => ({
      ...event,
      workshops: event.workshops ?? [],
      registrations: event.registrations ?? [],
      tickets: event.tickets ?? [],
    }));

    return NextResponse.json(eventsWithRelations);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
    const slug = createSlug(title);

    // Check if event with the same slug exists
    const existingEvent = await eventRepo.findOne({ where: { slug } });

    if (existingEvent) {
      return NextResponse.json(
        { error: "Event already exists with similar name" },
        { status: 400 }
      );
    }

    const event = eventRepo.create({ 
      title,
      slug,
      overview,
      category,
      eventType,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      venue,
      address,
      eventImageUrl,
      city,   
      state,  
      country, 
      postcode,
      isAllowWorkshop: isAllowWorkshop ?? false,
      isPaidFor: isPaidFor ?? false,
      workshops: [],       
      registrations: [],
      tickets: []
    });

    await eventRepo.save(event);

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
