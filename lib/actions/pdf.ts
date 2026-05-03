"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../cloudflare/r2";
import prisma from "../prisma";

export const createPdf = async (key: string) => {
  return await prisma.pdf.create({
    data: { key },
  });
};

export const getAllPdfs = async () => {
  return await prisma.pdf.findMany({});
};

export const getPdfById = async (id: string) => {
  return await prisma.pdf.findUnique({
    where: { id },
  });
};

export const deletePdf = async (id: string) => {
  const pdf = await prisma.pdf.findUnique({
    where: { id },
    select: { key: true },
  });

  if (!pdf) return;

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: pdf.key,
    }),
  );

  return await prisma.pdf.delete({
    where: { id },
  });
};
