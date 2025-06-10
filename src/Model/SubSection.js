const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    }
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in development
module.exports = mongoose.models.Subsection || mongoose.model("Subsection", subsectionSchema);
