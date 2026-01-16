import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requestId: { type: String, unique: true },
    fullName: String,
    mobile: String,
    email: String,
    serviceType: String,
    message: String,
    status: {
      type: String,
      enum: ["pending", "inProgress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
