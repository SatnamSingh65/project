export interface FamilyMember { id: string; name: string; role: string; color: string; }
export interface CalendarEvent { id: string; title: string; date: string; time: string; memberId: string; location?: string; conflict?: boolean; }
export interface Task { id: string; title: string; assigneeId: string; dueDate: string; priority: 'High'|'Medium'|'Low'; category: string; completed: boolean; fromEmail?: boolean; }
export interface Message { id: string; sender: 'sarah'|'elle'; text: string; time: string; }
export interface Caregiver { id: string; name: string; role: string; schedule: string; notes: string[]; emergencyContact: string; }
export interface PricingPlan { name: string; price: number; features: string[]; popular?: boolean; }
export interface Testimonial { name: string; role: string; quote: string; }
export interface FAQItem { question: string; answer: string; }