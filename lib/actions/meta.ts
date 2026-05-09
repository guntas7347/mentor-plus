"use server";

import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

const createMeta = async (key: string, value: any, isPublic = true) => {
  const meta = await prisma.metaData.upsert({
    where: {
      key,
    },
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
  if (key === "homepage_gallery") {
    revalidatePaths(["/gallery"]);
  } else if (key === "tutors") {
    revalidatePaths(["/", "/about"]);
  }
  return meta;
};

const updateMeta = async (key: string, value: any, isPublic: boolean) => {
  const meta = await prisma.metaData.update({
    where: {
      key,
    },
    data: {
      value,
      isPublic,
    },
  });
  if (key === "homepage_gallery") {
    revalidatePaths(["/", "/gallery"]);
  } else if (key === "tutors") {
    revalidatePaths(["/", "/about"]);
  }
  return meta;
};

const getMeta = async (key: string) => {
  return await prisma.metaData.findUnique({
    where: {
      key,
    },
  });
};

export { createMeta, updateMeta, getMeta };
