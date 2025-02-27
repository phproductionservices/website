import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Event } from "@/lib/database/entities/event.entity";
import { createSlug } from "@/lib/utils";
import { Registration } from "@/lib/database/entities/registration.entity";
import { EventStatus, TicketType } from "@/lib/base";
import { Ticket } from "@/lib/database/entities/ticket.entity";

// Configure route for static export
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const eventRepo = db.getRepository(Event);
    const registrationRepo = db.getRepository(Registration);

    // Fetch events and include related entities (workshops, tickets, registrations)
    const events = await eventRepo.find({
      where: { status: EventStatus.ACTIVE },
      relations: [
        "workshops",
        "workshops.ticket",
        "workshops.ticket.registrations",
        "tickets",
        "tickets.registrations",
        "eventspeakers",
      ],
      order: { created_at: "DESC" },
    });

    // Initialize counters
    let totalAmount = 0;
    let totalCapacity = 0;
    let activeEventCount = events.length;
    let totalSoldTicket = await registrationRepo.sum('quantity');;

    // Add ticket statistics to each event
    const eventsWithStats = events.map((event) => {
      let eventTotalSold = 0;
      let eventTotalAmount = 0;
      let eventTotalQuantity = 0;

      // Calculate event tickets stats
      for (const ticket of event.tickets || []) {
        const ticketsSold = ticket.registrations.length;
        eventTotalSold += ticketsSold;
        eventTotalAmount += ticketsSold * ticket.price;
        eventTotalQuantity += ticket.quantity;
      }

      // Calculate workshop tickets stats
      for (const workshop of event.workshops || []) {
        for (const ticket of workshop.ticket || []) {
          const ticketsSold = ticket.registrations.length;
          eventTotalSold += ticketsSold;
          eventTotalAmount += ticketsSold * ticket.price;
          eventTotalQuantity += ticket.quantity;
        }
      }

      // Update global totals
      totalAmount += eventTotalAmount;
      totalCapacity += eventTotalQuantity;

      return {
        ...event,
        totalsold: eventTotalSold,
        totalamount: eventTotalAmount,
        totalquantity: eventTotalQuantity,
        workshops: event.workshops ?? [],
        tickets: event.tickets ?? [],
        eventspeakers: event.eventspeakers ?? [],
      };
    });

    // Return formatted response
    return NextResponse.json({
      message: "Events fetch successful!",
      status: 200,
      error: false,
      data: {
        activeEvent: activeEventCount,
        totalAmount,
        totalCapacity,
        totalSoldTicket,
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
      isPaidFor,
      description,
      organizer
    } = await request.json();

    const db = await initializeDB();
    const eventRepo = db.getRepository(Event);
    const ticketRepo = db.getRepository(Ticket);
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
      description,
      organizer,
      workshops: [],     
      tickets: [],
      eventspeakers: [],
    });

    await eventRepo.save(event);

    if(event.isPaidFor == false) {
      const ticket = ticketRepo.create({
        type: TicketType.Event,
        name: event.title,
        price: 0,
        quantity: 40,
        event: { id: event.id },
        registrations: [],
        workshops: {},
      });

      await ticketRepo.save(ticket);
    }

    return NextResponse.json({ message: 'Events added successful!', data: event, status: 201, error: false });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: false, status: 500 },
      { status: 500 }
    );
  }
}
