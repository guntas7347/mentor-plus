"use server";

import { requireAuth } from "../auth";
import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export async function getAllSyllabus() {
  await requireAuth();
  return prisma.syllabus.findMany({
    orderBy: { createdAt: "desc" }, // Optional: keeps newest at the top
  });
}

export async function getAllPublishedSyllabus() {
  return prisma.syllabus.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getSyllabusById(id: string) {
  await requireAuth();
  return prisma.syllabus.findUnique({ where: { id } });
}

export async function updateSyllabus(id: string | null | undefined, data: any) {
  await requireAuth();

  // If there is no valid ID, or the ID is explicitly "new", CREATE a new record
  if (!id || id === "new") {
    const syllabus=await prisma.syllabus.create({
      data,
    });
    revalidatePaths(["/dashboard/syllabus"]);
    return syllabus;
  }

  // If a valid ID exists, UPDATE the existing record
  const syllabus=await prisma.syllabus.update({
    where: { id },
    data,
  });
  revalidatePaths(["/dashboard/syllabus"]);
  return syllabus;
}
export async function deleteSyllabusCategory(id: string) {
  await requireAuth();
  const syllabus=await prisma.syllabus.delete({ where: { id } });
  revalidatePaths(["/dashboard/syllabus"]);
  return syllabus;
}
