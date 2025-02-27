import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Event } from "@/lib/database/entities/event.entity";
import { Eventspeaker } from "@/lib/database/entities/event-speaker.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const speakerRepo = db.getRepository(Eventspeaker);

    const speakers = await speakerRepo.find({
      relations: ["event"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(speakers);
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return NextResponse.json(
      { error: "Failed to fetch speakers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { eventspeakers, uuid } = await request.json();

    if (!uuid || !eventspeakers || !Array.isArray(eventspeakers)) {
      return NextResponse.json(
        { error: "Invalid input: UUID and event speakers are required." },
        { status: 400 }
      );
    }

    const db = await initializeDB();
    const speakerRepo = db.getRepository(Eventspeaker);
    const eventRepo = db.getRepository(Event);

    // Find the event by UUID
    const event = await eventRepo.findOne({ where: { uuid } });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found." },
        { status: 404 }
      );
    }

    // Save all speakers
    const savedSpeakers = [];
    for (const speakerData of eventspeakers) {
      const speaker = speakerRepo.create({ ...speakerData, event });
      const savedSpeaker = await speakerRepo.save(speaker);
      savedSpeakers.push(savedSpeaker);
    }

    return NextResponse.json(savedSpeakers, { status: 201 });
  } catch (error) {
    console.error("Error creating speaker:", error);
    return NextResponse.json(
      { error: "Failed to create speaker" },
      { status: 500 }
    );
  }
}