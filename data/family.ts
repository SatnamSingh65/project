export interface FamilyMember {
  id: string;
  name: string;
  firstName: string;
  role: string;
  color: string;        // tailwind bg class
  hexColor: string;     // raw hex for dots / charts
  initials: string;
  avatarBg: string;     // tailwind bg class for avatar circle
}

export const familyMembers: FamilyMember[] = [
  {
    id: "sarah",
    name: "Sarah Chen",
    firstName: "Sarah",
    role: "Mom",
    color: "bg-blue-500",
    hexColor: "#3B82F6",
    initials: "SC",
    avatarBg: "bg-blue-500",
  },
  {
    id: "marcus",
    name: "Marcus Chen",
    firstName: "Marcus",
    role: "Dad",
    color: "bg-green-500",
    hexColor: "#22C55E",
    initials: "MC",
    avatarBg: "bg-green-500",
  },
  {
    id: "emma",
    name: "Emma Chen",
    firstName: "Emma",
    role: "Daughter, age 8",
    color: "bg-pink-500",
    hexColor: "#EC4899",
    initials: "EC",
    avatarBg: "bg-pink-500",
  },
  {
    id: "liam",
    name: "Liam Chen",
    firstName: "Liam",
    role: "Son, age 5",
    color: "bg-orange-500",
    hexColor: "#F97316",
    initials: "LC",
    avatarBg: "bg-orange-500",
  },
];

export const loggedInUser = familyMembers[0]; // Sarah