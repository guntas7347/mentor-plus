"use server";

import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export const upsertMeta = async (
  key: string,
  value: any,
  isPublic = true,
  revalidatePathsList: string[] | null = null,
) => {
  const meta = await prisma.metaData.upsert({
    where: { key },
    update: {
      value,
      isPublic,
    },
    create: {
      key,
      value,
      isPublic,
    },
  });

  if (revalidatePathsList) {
    revalidatePaths(revalidatePathsList);
  }

  return meta;
};

export const getMeta = async (key: string) => {
  return await prisma.metaData.findUnique({
    where: {
      key,
    },
  });
};
