import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Registration } from "@/lib/database/entities/registration.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const registrationRepo = db.getRepository(Registration);

    const registration = await registrationRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["user", "event", "ticket", "workshop"],
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(registration);
  } catch (error) {
    console.error("Error fetching registration:", error);
    return NextResponse.json(
      { error: "Failed to fetch registration" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { userId, eventId, ticketId, workshopId } = await request.json();
    
    const db = await initializeDB();
    const registrationRepo = db.getRepository(Registration);

    const registration = await registrationRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    Object.assign(registration, {
      user: userId ? { id: userId } : registration.user,
      event: eventId ? { id: eventId } : registration.event,
      ticket: ticketId ? { id: ticketId } : registration.ticket,
      workshop: workshopId ? { id: workshopId } : registration.workshop
    });

    await registrationRepo.save(registration);

    return NextResponse.json(registration);
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
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
    const registrationRepo = db.getRepository(Registration);

    const registration = await registrationRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    await registrationRepo.softRemove(registration);

    return NextResponse.json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}