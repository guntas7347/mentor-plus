"use server";

import { getServerSession } from "next-auth";
import { getUser } from "./actions/user";
import { redirect } from "next/navigation";

export const getSessionUser = async () => {
  const session = await getServerSession();
  if (!session) return null;
  const user = await getUser(session?.user?.email!);
  return user;
};

export const requireAuth = async (roles: string[] = ["ADMIN"]) => {
  const session = await getSessionUser();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (!roles.includes(session.role)) {
    throw new Error("FORBIDDEN");
  }

  return true;
};

export const requireUser = async () => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/");
  }

  return user;
};

export const requireRole = async (
  allowedRoles: ("ADMIN" | "STAFF" | "STUDENT")[],
) => {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/");
  }

  return user;
};
