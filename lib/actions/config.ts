"use server";

import { requireAuth } from "../auth";
import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export const getConfig = async (key: string) => {
  return prisma.config.findFirst({ where: { key } });
};

export const updateConfig = async (key: string, value: any) => {
  await requireAuth();
  await prisma.config.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  await revalidatePaths(["/courses", "/test-series"]);
};
