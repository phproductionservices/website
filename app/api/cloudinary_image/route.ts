import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import formidable, { File, Fields, Files } from "formidable";
import fs from "fs/promises";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse form data
async function parseForm(req: Request): Promise<{ fields: Record<string, string>; files: Record<string, File> }> {
  const form = new formidable.IncomingForm({
    multiples: false,
    maxFiles: 1,
    maxFileSize: 10 * 1024 * 1024, // Allow 10MB files
  });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields: Fields, files: Files) => {
      if (err) return reject(err);

      // Convert fields into a string record (handling string[] | undefined case)
      const processedFields: Record<string, string> = {};
      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        processedFields[key] = Array.isArray(value) ? value[0] : value || "";
      });

      // Ensure files contain a single `File` instance
      const processedFiles: Record<string, File> = {};
      Object.keys(files).forEach((key) => {
        const fileValue = files[key];
        if (Array.isArray(fileValue)) {
          processedFiles[key] = fileValue[0]; // Take the first file if multiple exist
        } else if (fileValue) {
          processedFiles[key] = fileValue;
        }
      });

      resolve({ fields: processedFields, files: processedFiles });
    });
  });
}

// Handle the POST request
export async function POST(req: Request) {
  try {
    const { fields, files } = await parseForm(req);

    if (!files.file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const file = files.file; // Now it's always a `File`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      public_id: `event-${Date.now()}`,
    });

    // Cleanup: Delete temporary file
    await fs.unlink(file.filepath);

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
