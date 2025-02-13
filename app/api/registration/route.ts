import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Registration } from "@/lib/database/entities/registration.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const registrationRepo = db.getRepository(Registration);

    const registrations = await registrationRepo.find({
      relations: ["user", "event", "ticket", "workshop"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, eventId, ticketId, workshopId } = await request.json();

    const db = await initializeDB();
    const registrationRepo = db.getRepository(Registration);

    const registration = registrationRepo.create({
      user: { id: userId },
      event: { id: eventId },
      ticket: ticketId ? { id: ticketId } : null,
      workshop: workshopId ? { id: workshopId } : null
    });

    await registrationRepo.save(registration);

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}