const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in development
module.exports = mongoose.models.Section || mongoose.model("Section", sectionSchema);
