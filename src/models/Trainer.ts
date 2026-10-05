import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrainer extends Document {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experienceYears: number;
  status: "Active" | "On Leave" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

const TrainerSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    experienceYears: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Trainer: Model<ITrainer> =
  mongoose.models.Trainer || mongoose.model<ITrainer>("Trainer", TrainerSchema);
