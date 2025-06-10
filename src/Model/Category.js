const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subsection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsection",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError during hot reload in Next.js
module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
