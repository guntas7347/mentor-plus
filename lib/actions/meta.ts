"use server";

import prisma from "../prisma";

const createMeta = async (key: string, value: any, isPublic = true) => {
  return await prisma.metaData.upsert({
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
};

const updateMeta = async (key: string, value: any, isPublic: boolean) => {
  return await prisma.metaData.update({
    where: {
      key,
    },
    data: {
      value,
      isPublic,
    },
  });
};

const getMeta = async (key: string) => {
  return await prisma.metaData.findUnique({
    where: {
      key,
    },
  });
};

export { createMeta, updateMeta, getMeta };
