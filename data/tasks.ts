export type Priority = "High" | "Medium" | "Low";
export type TaskCategory =
  | "household"
  | "kids"
  | "health"
  | "finance"
  | "errands";

export interface Task {
  id: string;
  title: string;
  assigneeId: string;
  dueDate: string;    // "YYYY-MM-DD"
  priority: Priority;
  category: TaskCategory;
  completed: boolean;
  fromEmail?: boolean;
}

export const tasks: Task[] = [
  // ── Active tasks ────────────────────────────────────────────────────────
  {
    id: "t1",
    title: "Sign Emma's permission slip",
    assigneeId: "sarah",
    dueDate: "2025-05-23",
    priority: "High",
    category: "kids",
    completed: false,
    fromEmail: true,
  },
  {
    id: "t2",
    title: "Book Liam's summer camp",
    assigneeId: "sarah",
    dueDate: "2025-05-25",
    priority: "High",
    category: "kids",
    completed: false,
  },
  {
    id: "t3",
    title: "Refill Liam's EpiPen prescription",
    assigneeId: "marcus",
    dueDate: "2025-05-24",
    priority: "High",
    category: "health",
    completed: false,
    fromEmail: false,
  },
  {
    id: "t4",
    title: "Grocery run — restock peanut-free snacks",
    assigneeId: "sarah",
    dueDate: "2025-05-23",
    priority: "Medium",
    category: "household",
    completed: false,
  },
  {
    id: "t5",
    title: "RSVP for Olivia's birthday party",
    assigneeId: "sarah",
    dueDate: "2025-05-22",
    priority: "Medium",
    category: "kids",
    completed: false,
    fromEmail: true,
  },
  {
    id: "t6",
    title: "Pay monthly nanny invoice — Maria",
    assigneeId: "marcus",
    dueDate: "2025-05-25",
    priority: "Medium",
    category: "finance",
    completed: false,
  },
  {
    id: "t7",
    title: "Order Emma's new soccer cleats",
    assigneeId: "sarah",
    dueDate: "2025-05-27",
    priority: "Medium",
    category: "kids",
    completed: false,
  },
  {
    id: "t8",
    title: "Pack soccer gear for Thursday",
    assigneeId: "sarah",
    dueDate: "2025-05-22",
    priority: "Medium",
    category: "kids",
    completed: false,
  },
  {
    id: "t9",
    title: "Schedule Marcus's dental follow-up",
    assigneeId: "marcus",
    dueDate: "2025-05-28",
    priority: "Low",
    category: "health",
    completed: false,
  },
  {
    id: "t10",
    title: "Return library books — Emma",
    assigneeId: "marcus",
    dueDate: "2025-05-26",
    priority: "Low",
    category: "errands",
    completed: false,
    fromEmail: true,
  },
  {
    id: "t11",
    title: "Clean out Liam's preschool backpack",
    assigneeId: "sarah",
    dueDate: "2025-05-24",
    priority: "Low",
    category: "household",
    completed: false,
  },
  {
    id: "t12",
    title: "Renew family car registration",
    assigneeId: "marcus",
    dueDate: "2025-05-30",
    priority: "Low",
    category: "finance",
    completed: false,
  },
  {
    id: "t13",
    title: "Buy birthday gift for Olivia",
    assigneeId: "sarah",
    dueDate: "2025-05-23",
    priority: "High",
    category: "kids",
    completed: false,
  },
  {
    id: "t14",
    title: "Confirm Ruth Chen for Friday backup",
    assigneeId: "sarah",
    dueDate: "2025-05-23",
    priority: "Medium",
    category: "household",
    completed: false,
  },
  {
    id: "t15",
    title: "Review health insurance renewal",
    assigneeId: "marcus",
    dueDate: "2025-05-29",
    priority: "Low",
    category: "finance",
    completed: false,
  },

  // ── Completed tasks ──────────────────────────────────────────────────────
  {
    id: "t16",
    title: "Schedule Liam's swim class for May",
    assigneeId: "sarah",
    dueDate: "2025-05-15",
    priority: "Medium",
    category: "kids",
    completed: true,
  },
  {
    id: "t17",
    title: "Pay Emma's piano tuition",
    assigneeId: "marcus",
    dueDate: "2025-05-10",
    priority: "High",
    category: "finance",
    completed: true,
  },
  {
    id: "t18",
    title: "Book Sarah's dental cleaning",
    assigneeId: "sarah",
    dueDate: "2025-05-09",
    priority: "Medium",
    category: "health",
    completed: true,
  },
  {
    id: "t19",
    title: "Restock first-aid kit",
    assigneeId: "marcus",
    dueDate: "2025-05-12",
    priority: "Low",
    category: "household",
    completed: true,
  },
  {
    id: "t20",
    title: "Send Emma's school photo release form",
    assigneeId: "sarah",
    dueDate: "2025-05-08",
    priority: "High",
    category: "kids",
    completed: true,
    fromEmail: true,
  },
];