// app/(admin)/layout.tsx
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["ADMIN", "STAFF"]);

  return <>{children}</>;
}
