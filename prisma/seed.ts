import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const tags: { [key: string]: { title: string; color: string }[] } = {
  "Type of Event": [
    { title: "Rally", color: "#FF5733" },
    { title: "Town Hall", color: "#8A8D8F" },
    { title: "Fundraiser", color: "#FFD700" },
    { title: "Workshop", color: "#3CB371" },
    { title: "Meeting", color: "#8A8D8F" },
    { title: "Social", color: "#FF69B4" },
    { title: "Press Conference", color: "#8A8D8F" },
    { title: "Viewing", color: "#000000" },
    { title: "Holiday", color: "#FF4500" },
    { title: "Panel Discussion", color: "#8A8D8F" },
    { title: "Policy Forum", color: "#8A8D8F" },
    { title: "Strategy Session", color: "#8A8D8F" },
    { title: "Leadership Training", color: "#3CB371" },
    { title: "Protest", color: "#FF0000" },
    { title: "Symposium", color: "#8A8D8F" },
    { title: "Debate", color: "#0000FF" },
    { title: "Meet and Greet", color: "#FF69B4" },
    { title: "Voting Information Session", color: "#0000FF" },
  ],
  "Political Level": [
    { title: "Town", color: "#228B22" },
    { title: "City", color: "#228B22" },
    { title: "County", color: "#228B22" },
    { title: "State", color: "#0000FF" },
    { title: "Federal", color: "#FF0000" },
    { title: "Regional", color: "#FFA500" },
  ],
  "Issue Focus": [
    { title: "Education", color: "#4B0082" },
    { title: "Healthcare", color: "#FF4500" },
    { title: "Individual Rights", color: "#FFD700" },
    { title: "Second Amendment", color: "#B22222" },
    { title: "Economy", color: "#FFD700" },
    { title: "Public Safety", color: "#FF4500" },
    { title: "Transportation", color: "#4682B4" },
    { title: "Voting", color: "#0000FF" },
    { title: "Immigration", color: "#FFA500" },
  ],
  "Target Audience": [
    { title: "General Public", color: "#2E8B57" },
    { title: "Students", color: "#4B0082" },
    { title: "Seniors", color: "#808080" },
    { title: "Veterans", color: "#000080" },
    { title: "Business Owners", color: "#FFD700" },
    { title: "Educators", color: "#4B0082" },
  ],
  "Participation Type": [
    { title: "Online", color: "#4682B4" },
    { title: "Observation", color: "#808080" },
    { title: "Volunteer", color: "#32CD32" },
  ],
  "Political Party or Affiliation": [
    { title: "Non-Partisan", color: "#808080" },
    { title: "Democratic", color: "#0000FF" },
    { title: "Republican", color: "#FF0000" },
    { title: "Libertarian", color: "#FFA500" },
    { title: "Independent", color: "#FFFF00" },
  ],
  Accessibility: [
    { title: "Wheelchair Accessible", color: "#32CD32" },
    { title: "Sign Language Interpreter", color: "#32CD32" },
    { title: "Transportation Provided", color: "#4682B4" },
  ],
  "Event Status": [
    { title: "Open for RSVP", color: "#32CD32" },
    { title: "Full", color: "#FF4500" },
    { title: "Cancelled", color: "#B22222" },
    { title: "Rescheduled", color: "#FFD700" },
  ],
  Frequency: [
    { title: "One-time", color: "#808080" },
    { title: "Weekly", color: "#32CD32" },
    { title: "Monthly", color: "#4682B4" },
    { title: "Annual", color: "#FFD700" },
  ],
  Cost: [
    { title: "Free", color: "#32CD32" },
    { title: "Paid", color: "#FF4500" },
    { title: "Donation-based", color: "#FFD700" },
  ],
};

const prisma = new PrismaClient();

async function seed() {
  await prisma.tag.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: Array.from({ length: 10 }, () => {
      return {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        password: faker.internet.password(),
        lastName: faker.person.lastName(),
      };
    }),
  });

  await prisma.tag.createMany({
    data: Array.from(Object.values(tags), (tags) => {
      return Array.from(tags, ({ title, color }) => ({ title, color }));
    }).flat(),
  });

  const seededUsers = await prisma.user.findMany();
  const seededTags = await prisma.tag.findMany();

  await prisma.event.createMany({
    data: Array.from({ length: 100 }, () => {
      return {
        attendees: faker.number.int(100),
        description: faker.lorem.paragraphs(1),
        name: faker.lorem.words(faker.number.int({ min: 1, max: 6 })),
        authorId: faker.helpers.arrayElement(seededUsers.map(({ id }) => id)),
        date: faker.date.anytime(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        duration: faker.number.int({ min: 1, max: 8 }),
        state: faker.location.state({ abbreviated: true }),
        zip: faker.location.zipCode(),
        tagIds: faker.helpers.arrayElements(
          seededTags.map(({ id }) => id),
          faker.number.int(10)
        ),
      };
    }),
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
