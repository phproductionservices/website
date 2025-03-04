import { prisma } from "@/lib/database/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const speakers = await prisma.eventspeaker.findMany({
      include: {
        event: true,
      },
      orderBy: { created_at: "desc" },
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

export async function POST(request : any) {
  try {
    const { formData, uuid } = await request.json();

    if (!Array.isArray(formData.speakers) || formData.speakers.length === 0) {
      return NextResponse.json(
        { message: "Invalid input: UUID and event speakers are required.", status: 400, error: true },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { uuid: uuid } });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found.", status: 404, error: true },
        { status: 404 }
      );
    }

    const savedSpeakers = await prisma.eventspeaker.createMany({
      data: formData.speakers.map((speaker: any) => ({ ...speaker, eventId: event.id })),
    });

    return NextResponse.json({ status: 201, data: savedSpeakers, message: "Speakers saved successfully" });
  } catch (error) {
    console.error("Error creating speaker:", error);
    return NextResponse.json(
      { message: "Failed to create speaker", error: true, status: 500 },
      { status: 500 }
    );
  }
}
