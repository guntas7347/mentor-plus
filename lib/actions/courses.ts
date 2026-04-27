"use server";

import { requireAuth } from "../auth";
import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export const createCourse = async () => {
  await requireAuth();
  const course = await prisma.course.create({
    data: {},
  });

  return course;
};

export const getAllCourses = async () => {
  await requireAuth();

  const courses = await prisma.course.findMany();
  return courses;
};

export const getAllPublishedCourses = async () => {
  return prisma.course.findMany({
    where: { isPublished: true },
    select: {
      id: true,

      thumbnailUrl: true,
      hotTag: true,
      slug: true,
      category: true,
      subtitle: true,
      title: true,
      description: true,

      durationMonths: true,
      discountedPrice: true,
      fullPrice: true,
      validTill: true,
      currency: true,
    },
  });
};

export const getCourseById = async (id: string) => {
  await requireAuth();

  const course = await prisma.course.findUnique({ where: { id } });
  return course;
};

export const getCourseBySlug = async (slug: string) => {
  const course = await prisma.course.findUnique({ where: { slug } });
  return course;
};

export const updateCourse = async (id: string, data: any) => {
  await requireAuth();

  const course = await prisma.course.update({
    where: { id },
    data,
  });
  revalidatePaths(["/courses", `/courses/${course.slug}`]);
  return course;
};

export const deleteCourse = async (id: string) => {
  await requireAuth();

  const course = await prisma.course.delete({
    where: { id },
  });
  revalidatePaths(["/courses", `/courses/${course.slug}`]);
  return course;
};
