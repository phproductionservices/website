import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { status: "ACTIVE" },
      include: {
        workshops: {
          include: { tickets : {
            include: { registrations: true }
          } },
        },  
        tickets: {
          include: { registrations: true },
        },
        eventSpeakers: true, 
      },
      orderBy: { created_at: "desc" },
    });    

    let totalAmount = 0;
    let totalCapacity = 0;
    let activeEventCount = events.length;
    let totalSoldTicket = await prisma.registration.aggregate({
      _sum: { quantity: true },
    });

    const eventsWithStats = events.map((event) => {
      let eventTotalSold = 0;
      let eventTotalAmount = 0;
      let eventTotalQuantity = 0;

      for (const ticket of event.tickets || []) {
        const ticketsSold = ticket.registrations.length;
        eventTotalSold += ticketsSold;
        eventTotalAmount += ticketsSold * ticket.price;
        eventTotalQuantity += ticket.quantity;
      }

      for (const workshop of event.workshops || []) {
        for (const ticket of workshop.tickets || []) {
          const ticketsSold = ticket.registrations.length;
          eventTotalSold += ticketsSold;
          eventTotalAmount += ticketsSold * ticket.price;
          eventTotalQuantity += ticket.quantity;
        }
      }

      totalAmount += eventTotalAmount;
      totalCapacity += eventTotalQuantity;

      return {
        ...event,
        totalsold: eventTotalSold,
        totalamount: eventTotalAmount,
        totalquantity: eventTotalQuantity,
      };
    });

    return NextResponse.json({
      message: "Events fetch successful!",
      status: 200,
      error: false,
      data: {
        activeEvent: activeEventCount,
        totalAmount,
        totalCapacity,
        totalSoldTicket: totalSoldTicket._sum.quantity || 0,
        events: eventsWithStats,
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events", status: 500, error: true },
      { status: 500 }
    );
  }
}

export async function POST(request: any) {
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
      isPaidFor,
      description,
      organizer,
    } = await request.json();

    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const existingEvent = await prisma.event.findUnique({ where: { slug } });

    if (existingEvent) {
      return NextResponse.json(
        { message: "Event already exists with similar name", status: 400, error: true },
        { status: 400 }
      );
    }

    const fullStartTime = new Date(`${date}T${startTime}:00`);
    const fullEndTime = new Date(`${date}T${endTime}:00`);

    const event = await prisma.event.create({
      data: {
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
        description,
        organizer,
      },
    });
    

    if (!event.isPaidFor) {
      await prisma.ticket.create({
        data: {
          type: "Event",
          name: event.title,
          price: 0,
          quantity: 40,
          eventId: event.id,
        },
      });
    }

    return NextResponse.json({
      message: "Events added successfully!",
      data: event,
      status: 201,
      error: false,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: true, status: 500 },
      { status: 500 }
    );
  }
}