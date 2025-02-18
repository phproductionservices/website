import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Event } from "@/lib/database/entities/event.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const eventRepo = db.getRepository(Event);

    const event = await eventRepo.findOne({
      where: { uuid: params.uuid },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({status: 200, data: event, message: "Event found", error: null});
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
      startTime, 
      endTime, 
      venue, 
      address, 
      eventImageUrl 
    } = await request.json();
    
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

    Object.assign(event, {
      title,
      overview,
      category,
      eventType,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      venue,
      address,
      eventImageUrl
    });

    await eventRepo.save(event);

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
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