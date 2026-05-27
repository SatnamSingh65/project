export interface ConflictAlert {
  title: string;
  description: string;
  suggestion: string;
}

export interface Alert {
  id: string;
  text: string;
  type: "warning" | "info";
}

export interface AiInsight {
  text: string;
}

export interface MorningBrief {
  greeting: string;
  date: string;
  weather: {
    temp: string;
    condition: string;
    location: string;
    icon: "sun" | "cloud" | "rain" | "partly-cloudy";
  };
  scheduleOverview: string;
  eventCount: { sarah: number; marcus: number };
  conflictAlert: ConflictAlert;
  alerts: Alert[];
  aiInsight: AiInsight;
}

export const morningBrief: MorningBrief = {
  greeting: "Good morning, Sarah",
  date: "Thursday, May 22, 2025",
  weather: {
    temp: "72°F",
    condition: "Partly Cloudy",
    location: "Austin, TX",
    icon: "partly-cloudy",
  },
  scheduleOverview:
    "You have 5 events today. Marcus has 3. Emma has soccer at 4:30.",
  eventCount: { sarah: 5, marcus: 3 },
  conflictAlert: {
    title: "Schedule conflict detected",
    description:
      "Marcus's dentist appointment at 3pm overlaps with your Team Standup at 3pm.",
    suggestion: "Suggestion: Join standup from mobile while Marcus is at dentist.",
  },
  alerts: [
    {
      id: "a1",
      text: "Emma's permission slip is due tomorrow — don't forget to sign it.",
      type: "warning",
    },
    {
      id: "a2",
      text: "Liam's swim class has moved to 2pm this week.",
      type: "info",
    },
  ],
  aiInsight: {
    text: "You've had back-to-back meetings every afternoon this week. Consider blocking Friday afternoon for family time — you've earned it.",
  },
};