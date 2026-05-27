export const caregivers: Caregiver[] = [
  {
    id: "maria",
    name: "Maria Gonzalez",
    initials: "MG",
    role: "Nanny",
    status: "Active",
    schedule: "Monday – Thursday, 12:00 PM – 6:00 PM",
    notes: [
      { icon: "alert",    text: "Liam is allergic to peanuts and tree nuts — check all snack labels." },
      { icon: "backpack", text: "Emma's inhaler is in the front pocket of her backpack." },
      { icon: "moon",     text: "Liam naps at 1pm for approximately 1 hour." },
      { icon: "tv-off",   text: "No screen time before 4pm for either child." },
    ],
    emergencyContact: { name: "Rosa Gonzalez", relation: "Sister",  phone: "(512) 555-0182" },
    avatarBg: "bg-teal-100 text-teal-700",
  },
  {
    id: "ruth",
    name: "Ruth Chen",
    initials: "RC",
    role: "Grandma (Backup)",
    status: "Active",
    schedule: "On-call — Fridays & Weekends",
    notes: [
      { icon: "car",   text: "Can pick up from school if needed — has car seats installed." },
      { icon: "clock", text: "Prefers at least 24 hours advance notice when possible." },
      { icon: "heart", text: "Kids' favourites: Sunday pancakes and reading together." },
    ],
    emergencyContact: { name: "David Chen", relation: "Husband", phone: "(512) 555-0247" },
    avatarBg: "bg-purple-100 text-purple-700",
  },
];