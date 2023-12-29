import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { randomTag } from "~/server/tags.server";

const prisma = new PrismaClient();

async function seed() {
  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: Array.from({ length: 100 }, () => ({
      attendees: faker.number.int(100),
      description: faker.lorem.paragraphs(1),
      name: faker.lorem.words(faker.number.int({ min: 1, max: 6 })),
      creator: faker.person.fullName(),
      date: faker.date.anytime(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      tags: new Array(
        ...new Set(
          Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () =>
            randomTag()
          )
        )
      ),
      duration: faker.number.int({ min: 1, max: 8 }),
      state: faker.location.state({ abbreviated: true }),
    })),
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
