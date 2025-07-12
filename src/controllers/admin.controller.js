import {Item} from "../models/item.model.js";
import {asyncHandler} from '../utils/asyncHandler.js'

export const approveItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    item.status = "approved";
    await item.save();

    res.json({ msg: "Item approved" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export const rejectItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    item.status = "unavailable";
    await item.save();

    res.json({ msg: "Item rejected/removed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
