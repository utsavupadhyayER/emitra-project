import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // aadhaar, pan, etc
    category: { type: String, enum: ["eMitra", "FinTech", "Digital"] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
