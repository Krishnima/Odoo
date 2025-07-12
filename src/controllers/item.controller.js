import Item from "../models/item.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// Add new item
export const addItem = asyncHandler(async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } =
      req.body;
    const user = req.user;
    let itemImage;
    const itemImagePath = req.file?.path;
    if (itemImagePath) {
      try {
        itemImage = await uploadOnCloudinary(avatarLocalPath);
      } catch (error) {
        return res
          .status(500)
          .json(
            new ApiError(
              500,
              `Somehting went wrong while uploading avatar: ${error}`
            )
          );
      }
    } else {
      return res.status(404).json(new ApiError(404, "Image is required"));
    }

    const newItem = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      image: itemImage?.url,
      uploader: user._id,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all approved items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "approved" }).populate(
      "uploader",
      "name"
    );
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get single item detail
export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "uploader",
      "name"
    );
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
