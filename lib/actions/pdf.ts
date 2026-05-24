"use server";

import prisma from "../prisma";

export const addPdf = async (name: string, src: string) => {
  return await prisma.pdf.create({
    data: {
      name,
      src,
    },
  });
};

export const getAllPdfs = async () => {
  return await prisma.pdf.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
