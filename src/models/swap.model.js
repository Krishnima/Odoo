import mongoose, { Schema } from "mongoose";

const swapSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["directSwap", "pointsRedemption"],
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "approved", "rejected", "completed", "cancelled"],
      default: "requested",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Swap", swapSchema);
