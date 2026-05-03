"use server";

import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export async function createUserIfNotExists(user: {
  email: string;
  name: string;
  image?: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser) return existingUser;

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      image: user.image,
    },
  });

  revalidatePaths(["/dashboard/users"]);
  return newUser;
}

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
