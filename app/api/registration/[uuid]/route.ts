import { prisma } from "@/lib/database/prisma";
import { NextResponse} from "next/server";

export async function GET( request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { uuid: params.uuid },
      include: {
        ticket: true,
      },
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

export async function PUT(request: Request,
  { params }: { params: { uuid: string } }) {
  try {
    const { userId, eventId, ticketId, workshopId } = await request.json();

    const registration = await prisma.registration.findUnique({
      where: { uuid: params.uuid },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    const updatedRegistration = await prisma.registration.update({
      where: { uuid: params.uuid },
      data: {
        ticketId: ticketId || registration.ticketId
      },
    });

    return NextResponse.json(updatedRegistration);
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
}

export async function DELETE( request: Request,
  { params }: { params: { uuid: string } }) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { uuid: params.uuid },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    await prisma.registration.delete({
      where: { uuid: params.uuid },
    });

    return NextResponse.json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}