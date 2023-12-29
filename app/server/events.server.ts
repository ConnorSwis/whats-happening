import { Event } from "@prisma/client";

import { prisma } from "./prisma.server";

export async function getEvents(n: number | undefined): Promise<Event[]> {
  const result = await prisma.event.findMany({
    take: n,
    orderBy: { date: "asc" },
  });
  if (result) {
    return result as Event[];
  }
  return [];
}
