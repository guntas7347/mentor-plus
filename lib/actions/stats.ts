"use server";

import { requireAuth } from "../auth";
import prisma from "../prisma";

export async function getDashboardStats() {
  await requireAuth();

  // Get the first day of the current month to calculate "trends/new additions"
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  try {
    // Run all database queries concurrently for maximum performance
    const [
      totalStudents,
      newStudentsThisMonth,
      activeCourses,
      newCoursesThisMonth,
      activeTestSeries,
      newTestSeriesThisMonth,
      recentEnrollments,
    ] = await Promise.all([
      // Student Stats
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({
        where: { role: "STUDENT", createdAt: { gte: startOfMonth } },
      }),

      // Course Stats
      prisma.course.count({ where: { isPublished: true } }),
      prisma.course.count({
        where: { isPublished: true, createdAt: { gte: startOfMonth } },
      }),

      // Test Series Stats
      prisma.testSeries.count({ where: { isPublished: true } }),
      prisma.testSeries.count({
        where: { isPublished: true, createdAt: { gte: startOfMonth } },
      }),

      // Recent Activity (Last 5 purchases)
      prisma.purchase.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, image: true, email: true },
          },
        },
      }),
    ]);

    return {
      students: {
        total: totalStudents,
        trend: `+${newStudentsThisMonth} this month`,
      },
      courses: {
        total: activeCourses,
        trend: `+${newCoursesThisMonth} this month`,
      },
      testSeries: {
        total: activeTestSeries,
        trend: `+${newTestSeriesThisMonth} this month`,
      },
      recentEnrollments,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw new Error("Failed to load dashboard statistics");
  }
}
