import { Event } from "@prisma/client";

import { prisma } from "./prisma.server";

export async function getEvents(n: number | undefined) {
  const result = await prisma.event.findMany({
    take: n,
    orderBy: { date: "asc" },
    include: { tags: true },
  });
  if (result) {
    return result;
  }
  return [];
}
