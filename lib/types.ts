import { Prisma } from "@/prisma/generated/client";

export type CoursePreview = Prisma.CourseGetPayload<{
  select: {
    id: true;
    thumbnailUrl: true;
    hotTag: true;
    slug: true;
    category: true;
    subtitle: true;
    title: true;
    summary: true;
    durationMonths: true;
    discountedPrice: true;
    fullPrice: true;
    validTill: true;
  };
}>;
