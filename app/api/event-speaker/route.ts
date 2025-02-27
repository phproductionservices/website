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
    const { formData, uuid } = await request.json();

    if (!Array.isArray(formData.speakers) || formData.speakers.length === 0) {
      return NextResponse.json(
        { message: "Invalid input: UUID and event speakers are required.", status: 400, error: true },
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
        { message: "Event not found.", status: 404, error: true },
        { status: 404 }
      );
    }

    // Save all speakers
    const savedSpeakers = [];
    for (const speakerData of formData.speakers) {
      const speaker = speakerRepo.create({ ...speakerData, event });
      const savedSpeaker = await speakerRepo.save(speaker);
      savedSpeakers.push(savedSpeaker);
    }

    return NextResponse.json({ status: 201, data: savedSpeakers, message: "Speakers saved successfully" });
  } catch (error) {
    console.error("Error creating speaker:", error);
    return NextResponse.json(
      { message: "Failed to create speaker", error: true, status: 500 },
      { status: 500 }
    );
  }
}