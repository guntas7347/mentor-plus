import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

function convertGoogleDriveUrl(url: string) {
  const match = url.match(/\/file\/d\/([^/]+)/);

  if (!match) return url;

  const fileId = match[1];

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export async function GET(req: Request, { params }: any) {
  try {
    const user = await getSessionUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const testSeries = await prisma.testSeries.findFirst({
      where: { id },
      select: { accessLink: true },
    });

    if (!testSeries?.accessLink) {
      return new Response("Access link not found", {
        status: 404,
      });
    }

    const driveUrl = convertGoogleDriveUrl(testSeries.accessLink);

    const res = await fetch(driveUrl);

    if (!res.ok || !res.body) {
      return new Response("Failed", { status: 500 });
    }

    return new Response(res.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="document.pdf"',
        "X-User-Email": user.email || "",
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to load PDF" }, { status: 500 });
  }
}
