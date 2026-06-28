export type HackathonMode = "online" | "offline" | "hybrid";

export type EventCategory = "hackathon" | "tech-event";

export type HackathonTheme =
  | "AI/ML"
  | "Blockchain"
  | "Web3"
  | "IoT"
  | "FinTech"
  | "HealthTech"
  | "EdTech"
  | "Design"
  | "Open Innovation"
  | "Mobile"
  | "Cloud"
  | "Cybersecurity"
  | "AR/VR"
  | "GreenTech"
  | "Social Impact";

export type IndianState =
  | "Andhra Pradesh"
  | "Arunachal Pradesh"
  | "Assam"
  | "Bihar"
  | "Chhattisgarh"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "Himachal Pradesh"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "Madhya Pradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "Tamil Nadu"
  | "Telangana"
  | "Tripura"
  | "Uttar Pradesh"
  | "Uttarakhand"
  | "West Bengal"
  | "Delhi"
  | "National";

export interface Hackathon {
  id: string;
  name: string;
  tagline: string;
  description: string;
  startDate: string;
  endDate: string;
  mode: HackathonMode;
  venue?: string;
  city?: string;
  state: IndianState;
  themes: HackathonTheme[];
  organizer: string;
  organizerLogo?: string;
  registrationLink: string;
  registrationDeadline: string;
  prizePool?: string;
  teamSize: string;
  isFeatured: boolean;
  status: "upcoming" | "live" | "closed";
  category: EventCategory;
}

export interface FilterState {
  search: string;
  states: IndianState[];
  modes: HackathonMode[];
  themes: HackathonTheme[];
  status: ("upcoming" | "live" | "closed")[];
  dateRange: "all" | "this-week" | "this-month" | "next-month";
}
