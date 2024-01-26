import { prisma } from "./prisma.server";

export function getTag(id: string) {
  return prisma.tag.findUnique({
    where: { id },
  });
}
