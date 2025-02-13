import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Country } from "@/lib/database/entities/country.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const countryRepo = db.getRepository(Country);

    const country = await countryRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["events"],
    });

    if (!country) {
      return NextResponse.json(
        { error: "Country not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error fetching country:", error);
    return NextResponse.json(
      { error: "Failed to fetch country" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { name } = await request.json();
    
    const db = await initializeDB();
    const countryRepo = db.getRepository(Country);

    const country = await countryRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!country) {
      return NextResponse.json(
        { error: "Country not found" },
        { status: 404 }
      );
    }

    country.name = name;
    await countryRepo.save(country);

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error updating country:", error);
    return NextResponse.json(
      { error: "Failed to update country" },
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
    const countryRepo = db.getRepository(Country);

    const country = await countryRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!country) {
      return NextResponse.json(
        { error: "Country not found" },
        { status: 404 }
      );
    }

    await countryRepo.softRemove(country);

    return NextResponse.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json(
      { error: "Failed to delete country" },
      { status: 500 }
    );
  }
}