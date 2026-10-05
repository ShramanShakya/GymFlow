import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClassSchedule extends Document {
  title: string;
  trainerName: string;
  date: string;
  time: string;
  room: string;
  capacity: number;
  enrolled: number;
  status: "Upcoming" | "In Progress" | "Completed" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    trainerName: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    room: { type: String, required: true, default: "Studio A" },
    capacity: { type: Number, required: true, min: 1 },
    enrolled: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["Upcoming", "In Progress", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

export const ClassSchedule: Model<IClassSchedule> =
  mongoose.models.ClassSchedule ||
  mongoose.model<IClassSchedule>("ClassSchedule", ClassSchema);
