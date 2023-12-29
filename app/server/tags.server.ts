export const tags: { [key: string]: string[] } = {
  "Type of Event": [
    "Rally",
    "Town Hall",
    "Fundraiser",
    "Workshop/Seminar",
    "Debate",
    "Meet and Greet",
    "Voting Information Session",
  ],
  "Political Level": ["Town", "City", "County", "State", "Federal"],
  "Issue Focus": [
    "Education",
    "Healthcare",
    "Environment",
    "Economy",
    "Civil Rights",
    "Public Safety",
    "Transportation",
  ],

  "Target Audience": [
    "General Public",
    "Youth",
    "Seniors",
    "Veterans",
    "Business Owners",
    "Educators",
  ],

  "Participation Type": [
    "Volunteer Opportunities",
    "Attendee",
    "Speaker/Panellist",
    "Host/Sponsor",
  ],

  "Political Party or Affiliation": [
    "Non-Partisan",
    "Democratic",
    "Republican",
    "Independent",
    "Other specific parties",
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
