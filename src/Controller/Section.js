const Section = require("../Model/Section");
const Subsection = require("../Model/SubSection");
const Category = require("../Model/Category");
const Product = require("../Model/Product");

// Create a new section
exports.createSection = async (name) => {
  try {
    const existing = await Section.findOne({ name });
    if (existing) return { success: false, status: 400, message: "Section already exists" };

    const section = await Section.create({ name });
    return { success: true, status: 201, data: section };
  } catch (err) {
    return { success: false, status: 500, message: err.message };
  }
};

// Update a section
exports.updateSection = async (oldName, newName) => {
  try {
    if (!oldName || !newName) {
      return { success: false, status: 400, message: "Old name and new name are required" };
    }

    const updatedSection = await Section.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true }
    );

    if (!updatedSection) {
      return { success: false, status: 404, message: "Section not found" };
    }

    return { success: true, status: 200, data: updatedSection };
  } catch (err) {
    return { success: false, status: 500, message: err.message };
  }
};

// Get all sections
exports.getAllSections = async () => {
  try {
    const sections = await Section.find();
    return { success: true, status: 200, data: sections };
  } catch (err) {
    return { success: false, status: 500, message: err.message };
  }
};

exports.deleteSection = async (id) => {
  try {
    const section = await Section.findByIdAndDelete(id);
    if (!section) return { success: false, status: 404, message: "Section not found" };

    return { success: true, status: 200, message: "Section deleted successfully" };
  } catch (err) {
    return { success: false, status: 500, message: err.message };
  }
};

exports.getAllSectionsWithSubsections = async () => {
  try {
    const sections = await Section.find();
    const data = await Promise.all(
      sections.map(async (section) => {
        const subsections = await Subsection.find({ section: section._id }).select("_id name");

        return {
          sectionId: section._id,
          sectionName: section.name,
          subsections: subsections.map((sub) => ({
            subsectionId: sub._id,
            subsectionName: sub.name,
          })),
        };
      })
    );

    return { success: true, status: 200, data };
  } catch (err) {
    console.error("Error fetching sections with subsections:", err);
    return { success: false, status: 500, message: err.message };
  }
};

exports.getAllProductsBySection = async (name) => {
  try {
    if (!name) return { success: false, status: 400, message: "Section name is required" };

    const section = await Section.findOne({ name: new RegExp(`^${name}$`, "i") });
    if (!section) return { success: false, status: 404, message: "Section not found" };

    const subsections = await Subsection.find({ section:section._id });
    const subsectionIds = subsections.map((sub) => sub._id);

    const categories = await Category.find({ subsection: { $in: subsectionIds } });
    const categoryIds = categories.map((cat) => cat._id);

    const products = await Product.find({ category: { $in: categoryIds } });

    return {
      success: true,
      status: 200,
      data: {
        section: section.name,
        products,
      },
    };
  } catch (err) {
    console.error("Error in getAllProductsBySection:", err);
    return { success: false, status: 500, message: err.message };
  }
};
