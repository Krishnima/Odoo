import Swap from "../models/Swap.js";
import Item from "../models/Item.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Request swap
export const requestSwap = asyncHandler(async (req, res) => {
  try {
    const { itemId, type } = req.body;
    const user = req.user;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    if (item.status !== "approved") {
      return res.status(400).json({ msg: "Item not available for swap" });
    }

    const newSwap = new Swap({
      item: itemId,
      requester: user._id,
      owner: item.uploader,
      type,
    });

    await newSwap.save();
    res.status(201).json(newSwap);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get user swaps
export const getMySwaps = asyncHandler(async (req, res) => {
  try {
    const user = req.user
    const swaps = await Swap.find({
      $or: [{ requester: user._id}, { owner: req.user._id }],
    })
      .populate("item")
      .populate("requester", "name")
      .populate("owner", "name");

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
