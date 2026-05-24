import { getSessionUser } from "@/lib/auth";
import { decrypt } from "@/lib/encrypt";

export async function GET(req: Request, { params }: any) {
  try {
    const user = await getSessionUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const fileId = await decrypt(id);

    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/pdf&key=${process.env.GOOGLE_DRIVE_API}`,
    );

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
