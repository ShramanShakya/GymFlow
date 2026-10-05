import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local or .env
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  process.loadEnvFile(envLocalPath);
} else if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ Error: MONGODB_URI is not set in .env.local");
  process.exit(1);
}

// Schemas
const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    membershipType: { type: String, enum: ["Basic", "Premium", "VIP"], default: "Basic" },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: { type: String, enum: ["Active", "Expired", "Pending"], default: "Active" },
  },
  { timestamps: true }
);

const TrainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    status: { type: String, enum: ["Active", "On Leave", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

const ClassSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    trainerName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    room: { type: String, required: true },
    capacity: { type: Number, required: true },
    enrolled: { type: Number, default: 0 },
    status: { type: String, enum: ["Upcoming", "In Progress", "Completed", "Cancelled"], default: "Upcoming" },
  },
  { timestamps: true }
);

const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);
const Trainer = mongoose.models.Trainer || mongoose.model("Trainer", TrainerSchema);
const ClassSchedule = mongoose.models.ClassSchedule || mongoose.model("ClassSchedule", ClassSchema);

const sampleMembers = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "081-234-5678",
    membershipType: "Premium",
    startDate: "2026-01-10",
    endDate: "2026-12-31",
    status: "Active",
  },
  {
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    phone: "082-345-6789",
    membershipType: "Basic",
    startDate: "2026-03-01",
    endDate: "2026-09-01",
    status: "Active",
  },
  {
    name: "Mike Tyson",
    email: "mike@example.com",
    phone: "083-456-7890",
    membershipType: "VIP",
    startDate: "2025-06-01",
    endDate: "2026-06-01",
    status: "Expired",
  },
  {
    name: "Emily Watson",
    email: "emily@example.com",
    phone: "084-567-8901",
    membershipType: "Premium",
    startDate: "2026-05-15",
    endDate: "2027-05-15",
    status: "Active",
  },
  {
    name: "Alex Rivera",
    email: "alex@example.com",
    phone: "085-678-9012",
    membershipType: "Basic",
    startDate: "2026-08-20",
    endDate: "2026-11-20",
    status: "Pending",
  },
  {
    name: "David Kim",
    email: "david@example.com",
    phone: "086-789-0123",
    membershipType: "VIP",
    startDate: "2026-02-14",
    endDate: "2027-02-14",
    status: "Active",
  },
];

const sampleTrainers = [
  {
    name: "Sarah Connor",
    email: "sarah.c@gymflow.com",
    phone: "089-111-2233",
    specialization: "Yoga & Pilates",
    experienceYears: 6,
    status: "Active",
  },
  {
    name: "Mike Vance",
    email: "mike.v@gymflow.com",
    phone: "089-222-3344",
    specialization: "Boxing & HIIT",
    experienceYears: 8,
    status: "Active",
  },
  {
    name: "John Miller",
    email: "john.m@gymflow.com",
    phone: "089-333-4455",
    specialization: "Strength & Conditioning",
    experienceYears: 5,
    status: "Active",
  },
  {
    name: "Elena Rostova",
    email: "elena.r@gymflow.com",
    phone: "089-444-5566",
    specialization: "Cardio & Endurance",
    experienceYears: 4,
    status: "Active",
  },
];

const sampleClasses = [
  {
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

async function seed() {
  console.log("🔄 Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB successfully!");

  console.log("🧹 Clearing existing data...");
  await Member.deleteMany({});
  await Trainer.deleteMany({});
  await ClassSchedule.deleteMany({});

  console.log("🌱 Seeding Members...");
  await Member.insertMany(sampleMembers);

  console.log("🌱 Seeding Trainers...");
  await Trainer.insertMany(sampleTrainers);

  console.log("🌱 Seeding Classes...");
  await ClassSchedule.insertMany(sampleClasses);

  console.log("🎉 Database seeded successfully!");
  console.log(`   - ${sampleMembers.length} members inserted`);
  console.log(`   - ${sampleTrainers.length} trainers inserted`);
  console.log(`   - ${sampleClasses.length} classes inserted`);

  await mongoose.disconnect();
  console.log("👋 Disconnected from MongoDB.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
