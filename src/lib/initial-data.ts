export interface MemberItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: "Basic" | "Premium" | "VIP";
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Pending";
}

export interface TrainerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experienceYears: number;
  status: "Active" | "On Leave" | "Inactive";
}

export interface ClassItem {
  id: string;
  title: string;
  trainerName: string;
  date: string;
  time: string;
  room: string;
  capacity: number;
  enrolled: number;
  status: "Upcoming" | "In Progress" | "Completed" | "Cancelled";
}

export const initialMembers: MemberItem[] = [
  {
    id: "mem-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "081-234-5678",
    membershipType: "Premium",
    startDate: "2026-01-10",
    endDate: "2026-12-31",
    status: "Active",
  },
  {
    id: "mem-2",
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    phone: "082-345-6789",
    membershipType: "Basic",
    startDate: "2026-03-01",
    endDate: "2026-09-01",
    status: "Active",
  },
  {
    id: "mem-3",
    name: "Mike Tyson",
    email: "mike@example.com",
    phone: "083-456-7890",
    membershipType: "VIP",
    startDate: "2025-06-01",
    endDate: "2026-06-01",
    status: "Expired",
  },
  {
    id: "mem-4",
    name: "Emily Watson",
    email: "emily@example.com",
    phone: "084-567-8901",
    membershipType: "Premium",
    startDate: "2026-05-15",
    endDate: "2027-05-15",
    status: "Active",
  },
  {
    id: "mem-5",
    name: "Alex Rivera",
    email: "alex@example.com",
    phone: "085-678-9012",
    membershipType: "Basic",
    startDate: "2026-08-20",
    endDate: "2026-11-20",
    status: "Pending",
  },
  {
    id: "mem-6",
    name: "David Kim",
    email: "david@example.com",
    phone: "086-789-0123",
    membershipType: "VIP",
    startDate: "2026-02-14",
    endDate: "2027-02-14",
    status: "Active",
  },
];

export const initialTrainers: TrainerItem[] = [
  {
    id: "trn-1",
    name: "Sarah Connor",
    email: "sarah.c@gymflow.com",
    phone: "089-111-2233",
    specialization: "Yoga & Pilates",
    experienceYears: 6,
    status: "Active",
  },
  {
    id: "trn-2",
    name: "Mike Vance",
    email: "mike.v@gymflow.com",
    phone: "089-222-3344",
    specialization: "Boxing & HIIT",
    experienceYears: 8,
    status: "Active",
  },
  {
    id: "trn-3",
    name: "John Miller",
    email: "john.m@gymflow.com",
    phone: "089-333-4455",
    specialization: "Strength & Conditioning",
    experienceYears: 5,
    status: "Active",
  },
  {
    id: "trn-4",
    name: "Elena Rostova",
    email: "elena.r@gymflow.com",
    phone: "089-444-5566",
    specialization: "Cardio & Endurance",
    experienceYears: 4,
    status: "Active",
  },
];

export const initialClasses: ClassItem[] = [
  {
    id: "cls-1",
    title: "Morning Yoga",
    trainerName: "Sarah Connor",
    date: "Sep 12, 2026",
    time: "08:00 - 09:00",
    room: "Studio A",
    capacity: 20,
    enrolled: 16,
    status: "Upcoming",
  },
  {
    id: "cls-2",
    title: "Boxing Basics",
    trainerName: "Mike Vance",
    date: "Sep 12, 2026",
    time: "10:00 - 11:15",
    room: "Boxing Ring",
    capacity: 15,
    enrolled: 15,
    status: "Upcoming",
  },
  {
    id: "cls-3",
    title: "Strength Training",
    trainerName: "John Miller",
    date: "Sep 13, 2026",
    time: "18:00 - 19:30",
    room: "Weight Room",
    capacity: 12,
    enrolled: 9,
    status: "Upcoming",
  },
  {
    id: "cls-4",
    title: "HIIT Blast",
    trainerName: "Elena Rostova",
    date: "Sep 14, 2026",
    time: "17:30 - 18:30",
    room: "Studio B",
    capacity: 25,
    enrolled: 18,
    status: "Upcoming",
  },
];
