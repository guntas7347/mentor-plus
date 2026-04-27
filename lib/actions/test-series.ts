"use server";

import { getSessionUser, requireAuth } from "../auth";
import prisma from "../prisma";

export async function getAllTestSeries() {
  await requireAuth();
  return prisma.testSeries.findMany();
}

export async function getAllPublishedTestSeries() {
  return prisma.testSeries.findMany({ where: { isPublished: true } });
}

export async function deleteTestSeries(id: string) {
  await requireAuth();
  return prisma.testSeries.delete({ where: { id } });
}

export async function createTestSeries() {
  await requireAuth();
  return prisma.testSeries.create({
    data: {
      title: "New Test Series",
      status: "draft",
      category: "",
      fullPrice: 0,
      discountedPrice: 0,
      validityMonths: 0,
    },
  });
}

export async function updateTestSeries(id: string, data: any) {
  await requireAuth();

  return prisma.testSeries.update({
    where: { id },
    data,
  });
}

export async function getTestSeriesById(id: string) {
  await requireAuth();

  return prisma.testSeries.findUnique({ where: { id } });
}

export async function getTestSeriesBySlug(slug: string) {
  return prisma.testSeries.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      category: true,
      thumbnailUrl: true,
      description: true,
      fullPrice: true,
      discountedPrice: true,
      validityMonths: true,
      status: true,
      isPublished: true,
      createdAt: true,
      updatedAt: true,
      phases: true,
      reviews: true,
      features: true,
      analytics: true,
      stats: true,
      validTill: true,
      currency: true,
      slug: true,
    },
  });
}

export async function getMyEnrolledTestSeries() {
  const user = await getSessionUser();
  if (!user) return { error: "Unauthorized" };

  return prisma.purchase.findMany({
    where: {
      userId: user.id,
      status: "SUCCESS",
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    include: {
      testSeries: {
        select: {
          id: true,
          title: true,
          category: true,
          thumbnailUrl: true,
        },
      },
    },
  });
}
