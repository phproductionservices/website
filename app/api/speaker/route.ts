import { prisma } from "@/lib/database/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const speakers = await prisma.speaker.findMany({
      include: {
        workshop: true,
      },
      orderBy: { created_at: "desc" },
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