import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Event } from "@/lib/database/entities/event.entity";
import { createSlug } from "@/lib/utils";
import { data } from "autoprefixer";
import { error } from "console";

// Configure route for static export
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const eventRepo = db.getRepository(Event);

    // Fetch events and include related entities (workshops, registrations, tickets)
    const events = await eventRepo.find({
      relations: ["workshops", "tickets"],
      order: { created_at: "DESC" },
    });

    // Ensure empty arrays for missing relations
    const eventsWithRelations = events.map(event => ({
      ...event,
      workshops: event.workshops ?? [],
      tickets: event.tickets ?? [],
    }));

    return NextResponse.json({ message: 'Events fetch successful!', data: eventsWithRelations, status: 200, error: false });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events", status: 500, error: true },
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
        { message: "Event already exists with similar name", status: 400, error: true },
        { status: 400 }
      );
    }

    const fullStartTime = new Date(`${date}T${startTime}:00`);
    const fullEndTime = new Date(`${date}T${endTime}:00`);

    const event = eventRepo.create({ 
      title,
      slug,
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
      workshops: [],     
      tickets: []
    });

    await eventRepo.save(event);

    return NextResponse.json({ message: 'Events added successful!', data: event, status: 201, error: false });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: false, status: 500 },
      { status: 500 }
    );
  }
}
