import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import DashboardLayout from "./layoutClient";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simulating user fetch or auth check
  const user = await getSessionUser();

  if (!user) {
    redirect("/");
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
