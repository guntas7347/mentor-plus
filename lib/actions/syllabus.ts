"use server";

import { requireAuth } from "../auth";
import prisma from "../prisma";

export async function getAllSyllabus() {
  await requireAuth();
  return prisma.syllabus.findMany();
}

export async function getAllPublishedSyllabus() {
  return prisma.syllabus.findMany({ where: { isPublished: true } });
}

export async function getSyllabusById(id: string) {
  await requireAuth();
  return prisma.syllabus.findUnique({ where: { id } });
}

export async function createSyllabus() {
  await requireAuth();
  return prisma.syllabus.create({
    data: {
      categoryId: "new-cat",
      categoryTitle: "New Category",
    },
  });
}

export async function updateSyllabus(id: string, data: any) {
  await requireAuth();
  return prisma.syllabus.update({
    where: { id },
    data,
  });
}

export async function deleteSyllabus(id: string) {
  await requireAuth();
  return prisma.syllabus.delete({ where: { id } });
}
