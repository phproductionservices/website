import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { City } from "@/lib/database/entities/city.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const cityRepo = db.getRepository(City);

    const cities = await cityRepo.find({
      relations: ["events"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const db = await initializeDB();
    const cityRepo = db.getRepository(City);

    const city = cityRepo.create({ 
      name,
      events: []
    });

    await cityRepo.save(city);

    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error("Error creating city:", error);
    return NextResponse.json(
      { error: "Failed to create city" },
      { status: 500 }
    );
  }
}