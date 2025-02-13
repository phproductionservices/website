import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Country } from "@/lib/database/entities/country.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const countryRepo = db.getRepository(Country);

    const countries = await countryRepo.find({
      relations: ["events"],
      order: { created_at: "DESC" },
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const db = await initializeDB();
    const countryRepo = db.getRepository(Country);

    const country = countryRepo.create({ 
      name,
      events: []
    });

    await countryRepo.save(country);

    return NextResponse.json(country, { status: 201 });
  } catch (error) {
    console.error("Error creating country:", error);
    return NextResponse.json(
      { error: "Failed to create country" },
      { status: 500 }
    );
  }
}