"use server";

import { getSessionUser, requireAuth } from "../auth";
import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export async function getAllTestSeries() {
  await requireAuth();
  return prisma.testSeries.findMany({
    include: {
      _count: {
        select: { purchases: { where: { status: "SUCCESS" } } },
      },
    },
  });
}

export async function getAllPublishedTestSeries() {
  return prisma.testSeries.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      category: true,
      thumbnailUrl: true,
      summary: true,
      description: true,
      fullPrice: true,
      discountedPrice: true,
      validityMonths: true,
      hotTag: true,
      slug: true,
    },
  });
}

export async function deleteTestSeries(id: string) {
  await requireAuth();
  const testSeries = await prisma.testSeries.delete({ where: { id } });
  revalidatePaths([
    "/dashboard/test-series",
    "/test-series",
    `/test-series/${testSeries.slug}`,
  ]);
  return testSeries;
}

export async function createTestSeries() {
  await requireAuth();
  const testSeries = await prisma.testSeries.create({
    data: {
      title: "New Test Series",
      status: "draft",
      category: "",
      fullPrice: 0,
      discountedPrice: 0,
      validityMonths: 0,
    },
  });

  revalidatePaths(["/dashboard/test-series"]);
  return testSeries;
}

export async function updateTestSeries(id: string, data: any) {
  await requireAuth();

  const testSeries = await prisma.testSeries.update({
    where: { id },
    data,
  });
  revalidatePaths([
    "/dashboard/test-series",
    `/dashboard/test-series/${id}`,
    "/test-series",
    `/test-series/${testSeries.slug}`,
  ]);
  return testSeries;
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
      slug: true,
      sampleLink: true,
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
          accessLink: true,
          slug: true,
        },
      },
    },
  });
}
