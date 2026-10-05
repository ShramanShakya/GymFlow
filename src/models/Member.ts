import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMember extends Document {
  name: string;
  email: string;
  phone: string;
  membershipType: "Basic" | "Premium" | "VIP";
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Pending";
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    membershipType: {
      type: String,
      enum: ["Basic", "Premium", "VIP"],
      default: "Basic",
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Expired", "Pending"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Member: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);
