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
    description: true;
    summary: true;
    durationMonths: true;
    discountedPrice: true;
    fullPrice: true;
    validTill: true;
  };
}>;

export type Mentor = {
  name: string;
  role: string;
  exp: string;
  degree: string;
  degreeIcon: React.ReactNode;
  borderRadius?: string;
};
