import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { City } from "@/lib/database/entities/city.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await initializeDB();
    const cityRepo = db.getRepository(City);

    const city = await cityRepo.findOne({
      where: { uuid: params.uuid },
      relations: ["events"],
    });

    if (!city) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    return NextResponse.json(
      { error: "Failed to fetch city" },
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
    const cityRepo = db.getRepository(City);

    const city = await cityRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!city) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    city.name = name;
    await cityRepo.save(city);

    return NextResponse.json(city);
  } catch (error) {
    console.error("Error updating city:", error);
    return NextResponse.json(
      { error: "Failed to update city" },
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
    const cityRepo = db.getRepository(City);

    const city = await cityRepo.findOne({
      where: { uuid: params.uuid }
    });

    if (!city) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    await cityRepo.softRemove(city);

    return NextResponse.json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    return NextResponse.json(
      { error: "Failed to delete city" },
      { status: 500 }
    );
  }
}