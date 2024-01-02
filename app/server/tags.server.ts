export const tags: { [key: string]: string[] } = {
  "Type of Event": [
    "Rally",
    "Town Hall",
    "Fundraiser",
    "Workshop",
    "Meeting",
    "Social",
    "Press Conference",
    "Viewing",
    "Holiday",
    "Panel Discussion",
    "Policy Forum",
    "Strategy Session",
    "Leadership Training",
    "Protest",
    "Symposium",
    "Debate",
    "Meet and Greet",
    "Voting Information Session",
  ],
  "Political Level": ["Town", "City", "County", "State", "Federal", "Regional"],
  "Issue Focus": [
    "Education",
    "Healthcare",
    "Individual Rights",
    "Second Amendment",
    "Economy",
    "Public Safety",
    "Transportation",
    "Voting",
    "Immigration",
  ],
  "Target Audience": [
    "General Public",
    "Students",
    "Seniors",
    "Veterans",
    "Business Owners",
    "Educators",
  ],
  "Participation Type": ["Online", "Observation", "Volunteer"],
  "Political Party or Affiliation": [
    "Non-Partisan",
    "Democratic",
    "Republican",
    "Libertarian",
    "Independent",
  ],
  Accessibility: [
    "Wheelchair Accessible",
    "Sign Language Interpreter",
    "Transportation Provided",
  ],
  "Event Status": ["Open for RSVP", "Full", "Cancelled", "Rescheduled"],
  Frequency: ["One-time", "Weekly", "Monthly", "Annual"],
  Cost: ["Free", "Paid", "Donation-based"],
};

export function randomTag(): string {
  const tagType =
    Object.keys(tags)[Math.floor(Math.random() * Object.keys(tags).length)];
  const tag = tags[tagType][Math.floor(Math.random() * tags[tagType].length)];
  return tag;
}
