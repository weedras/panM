import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import crypto from "crypto";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { filenames } = await req.json();
    if (!filenames || !filenames.length) {
      return NextResponse.json({ error: "No filenames provided" }, { status: 400 });
    }

    // Generate a unique job ID for this batch
    const jobId = crypto.randomBytes(8).toString("hex");
    
    const urls = await Promise.all(
      filenames.map(async (filename) => {
        const s3Key = `uploads/${jobId}/${filename}`;
        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: s3Key,
        });
        
        // URL expires in 15 minutes
        const url = await getSignedUrl(s3, command, { expiresIn: 900 });
        return { filename, url, s3Key };
      })
    );

    return NextResponse.json({ jobId, urls });
  } catch (error) {
    console.error("Presigned URL error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate URLs" }, { status: 500 });
  }
}
