export type Sender = "elle" | "sarah";

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  time: string;
  options?: string[]; // quick-reply chips
}

export const elleConversation: Message[] = [
  {
    id: "m1",
    sender: "elle",
    text: "Good morning, Sarah! ☀️ You have 5 events and 3 high-priority tasks today. Want me to walk you through your day?",
    time: "7:02 AM",
  },
  {
    id: "m2",
    sender: "sarah",
    text: "What does Emma have this week?",
    time: "7:04 AM",
  },
  {
    id: "m3",
    sender: "elle",
    text: "Here's Emma's week:\n⚽ Soccer Practice — Tue & Thu, 4:30pm @ Riverside Park\n🎹 Piano Lesson — Wed, 3:30pm @ Music Academy\n🎒 Field Trip — Thu, 8:30am @ Austin Science Museum\n🎉 Olivia's Birthday Party — Sat, 2pm @ Jump Around Austin",
    time: "7:04 AM",
  },
  {
    id: "m4",
    sender: "sarah",
    text: "Can you set a reminder for me to sign her permission slip?",
    time: "7:05 AM",
  },
  {
    id: "m5",
    sender: "elle",
    text: "Done! I've set a reminder for tonight at 8pm: \"Sign Emma's field trip permission slip.\" I'll also send you a push notification. 📝",
    time: "7:05 AM",
  },
  {
    id: "m6",
    sender: "elle",
    text: "While we're on Emma — have you RSVPd to Olivia's birthday party yet? It's this Saturday. Emma would be heartbroken to miss it! 🎂",
    time: "7:06 AM",
  },
  {
    id: "m7",
    sender: "sarah",
    text: "Not yet. Also, can you move Marcus's dentist appointment to Thursday?",
    time: "7:08 AM",
  },
  {
    id: "m8",
    sender: "elle",
    text: "I found 3 available Thursday slots at Austin Dental:\n🕙 10:00 AM\n🕑 2:00 PM\n🕓 4:00 PM\nWhich works best for Marcus?",
    time: "7:08 AM",
    options: ["10:00 AM", "2:00 PM", "4:00 PM"],
  },
  {
    id: "m9",
    sender: "sarah",
    text: "2pm works.",
    time: "7:09 AM",
  },
  {
    id: "m10",
    sender: "elle",
    text: "✅ Done! Marcus's dentist is rescheduled to Thursday, May 22 at 2:00 PM. I've updated the family calendar and sent Marcus a notification.",
    time: "7:09 AM",
  },
  {
    id: "m11",
    sender: "sarah",
    text: "Set a reminder Wednesday night to pack Emma's soccer gear.",
    time: "7:11 AM",
  },
  {
    id: "m12",
    sender: "elle",
    text: "Reminder set for Wednesday at 8pm: \"Pack Emma's soccer gear for Thursday practice.\" 🎒\n\nAlso — Emma's cleats are looking a bit worn from the last few games. Want me to find some options for her size? I can pull up a few picks.",
    time: "7:11 AM",
  },
];