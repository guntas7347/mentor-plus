"use server";
import { requireAuth } from "../auth";
import prisma from "../prisma";

export async function getAllPurchases(page: number = 1, limit: number = 25) {
  await requireAuth();

  const skip = (page - 1) * limit;

  const [purchases, total] = await Promise.all([
    prisma.purchase.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone: true,
          },
        },
        testSeries: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.purchase.count(),
  ]);

  return {
    data: purchases,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
