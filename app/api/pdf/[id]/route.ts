// import { GetObjectCommand } from "@aws-sdk/client-s3";
// import { s3 } from "@/lib/cloudflare/r2";
// import prisma from "@/lib/prisma";
// import { getSessionUser } from "@/lib/auth";

// export async function GET(req: Request, { params }: any) {
//   const user = await getSessionUser();

//   if (!user?.id) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const hasAccess = async (userId: string, pdfId: string) => {
//     if (user.role === "ADMIN") return true;

//     const exists = await prisma.user.findFirst({
//       where: {
//         id: userId,
//         testSeries: {
//           some: {
//             accessLink: pdfId,
//           },
//         },
//       },
//       select: { id: true },
//     });

//     return !!exists;
//   };

//   const { id } = await params;

//   const pdf = await prisma.pdf.findUnique({
//     where: { id },
//   });

//   if (!pdf || !(await hasAccess(user?.id!, pdf.id))) {
//     return new Response("Forbidden", { status: 403 });
//   }

//   const data: any = await s3.send(
//     new GetObjectCommand({
//       Bucket: process.env.R2_BUCKET!,
//       Key: pdf.key,
//     }),
//   );

//   return new Response(data.Body, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "x-user-email": user?.email!,
//     },
//   });
// }
