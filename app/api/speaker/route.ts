import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/database/db";
import { Speaker } from "@/lib/database/entities/speaker.entity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await initializeDB();
    const speakerRepo = db.getRepository(Speaker);

    const speakers = await speakerRepo.find({
      relations: ["workshop"],
      order: { created_at: "DESC" },
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

// export async function POST(request: Request) {
//   try {
//     const { name, description, imageUrl, workshopId } = await request.json();

//     const db = await initializeDB();
//     const speakerRepo = db.getRepository(Speaker);

//     const speaker = speakerRepo.create({
//       name,
//       description,
//       imageUrl,
//       workshop: workshopId ? { id: workshopId } : null
//     });

//     await speakerRepo.save(speaker);

//     return NextResponse.json(speaker, { status: 201 });
//   } catch (error) {
//     console.error("Error creating speaker:", error);
//     return NextResponse.json(
//       { error: "Failed to create speaker" },
//       { status: 500 }
//     );
//   }
// }