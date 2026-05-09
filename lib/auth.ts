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

export const requireAuth = async (role = "ADMIN") => {
  const session = await getSessionUser();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (session.role !== role) {
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

export const requireStudent = async () => {
  const user = await getSessionUser();

  if (user?.role !== "STUDENT") {
    redirect("/");
  }

  return user;
};
export const requireAdmin = async () => {
  const user = await requireUser();

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
};
