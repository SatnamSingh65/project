export interface WeeklyBar {
  day: string;
  completed: number;
  total: number;
}

export interface TomorrowEvent {
  time: string;
  title: string;
  memberId: string;
}

export interface TomorrowTask {
  title: string;
  priority: "High" | "Medium" | "Low";
  assigneeId: string;
}

export interface EveningRecap {
  tasksCompleted: number;
  tasksTotal: number;
  eventsAttended: number;
  eventsTotal: number;
  weeklyBars: WeeklyBar[];
  tomorrowEvents: TomorrowEvent[];
  tomorrowTasks: TomorrowTask[];
  aiSummary: string;
}

export const eveningRecap: EveningRecap = {
  tasksCompleted: 3,
  tasksTotal: 5,
  eventsAttended: 4,
  eventsTotal: 5,
  weeklyBars: [
    { day: "Mon", completed: 4, total: 5 },
    { day: "Tue", completed: 3, total: 4 },
    { day: "Wed", completed: 5, total: 6 },
    { day: "Thu", completed: 3, total: 5 },
    { day: "Fri", completed: 0, total: 3 },
  ],
  tomorrowEvents: [
    { time: "9:00 AM",  title: "Team Standup",                   memberId: "sarah"  },
    { time: "2:00 PM",  title: "Marcus — Dentist (rescheduled)", memberId: "marcus" },
    { time: "4:30 PM",  title: "Emma — Soccer Practice",         memberId: "emma"   },
  ],
  tomorrowTasks: [
    { title: "Sign Emma's permission slip",    priority: "High",   assigneeId: "sarah" },
    { title: "Buy birthday gift for Olivia",   priority: "High",   assigneeId: "sarah" },
    { title: "Confirm Ruth for Friday backup", priority: "Medium", assigneeId: "sarah" },
  ],
  aiSummary:
    `Solid day, Sarah! You completed 3 tasks and made it to all
your events. Tomorrow looks lighter — a great chance to tackle that summer camp registration
before spots fill up.`,
};