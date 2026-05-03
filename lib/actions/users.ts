"use server";
import { getSessionUser, requireAuth } from "../auth";
import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export async function updateUserProfile(data: {
  name: string;
  phone: string;
  address: string;
}) {
  const session = await getSessionUser();
  if (!session?.id) throw new Error("Unauthorized");

  // Server-side validation just in case they bypass frontend HTML validation
  if (data.phone && !/^\d{10}$/.test(data.phone)) {
    throw new Error("Invalid mobile number format.");
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.id },
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address,
    },
  });

  revalidatePaths(["/dashboard/settings", "/dashboard/profile"]);
  return updatedUser;
}

export async function getAllUsers(
  page: number = 1,
  limit: number = 25,
  search: string = "",
) {
  await requireAuth();

  const skip = (page - 1) * limit;

  // Build the search query dynamically
  const whereCondition = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  // Run both queries concurrently for maximum performance
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        purchases: {
          orderBy: { createdAt: "desc" },
          include: {
            testSeries: {
              select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                thumbnailUrl: true,
              },
            },
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

// 2. Update the user's role
export async function updateUserRole(id: string, role: "STUDENT" | "ADMIN") {
  await requireAuth();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });
    revalidatePaths(["/dashboard/users", `/dashboard/users/${id}`]);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update role");
  }
}
