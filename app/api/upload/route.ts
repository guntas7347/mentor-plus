import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/cloudflare/r2";
import prisma from "@/lib/prisma";
import { createPdf } from "@/lib/actions/pdf";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const key = `mentor-plus/${Date.now()}-${file.name}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: "application/pdf",
    }),
  );

  const pdf = await createPdf(key);

  return Response.json({ id: pdf.id });
}
