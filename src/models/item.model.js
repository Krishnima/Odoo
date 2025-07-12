import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["men", "women", 'kid'],
      required: true,
    },
    type: {
      type: String,
      enum: ["Shirt", "Pants"],
      required: true,
    },
    size: {
      type: String, 
      enum: ['s', 'm', 'l', 'xl', 'xxl'],
      required: true,
    },
    condition: {
      type: String,
      enum: ["New", "Good", "Used"],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String], // store image URLs or paths
      default: [],
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "swapped", "unavailable"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
