const Section = require("../Model/Section");
const Subsection = require("../Model/SubSection");
const Category = require("../Model/Category");
const Product = require("../Model/Product");

exports.createSection = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Section.findOne({name});
    if (existing) return res.status(400).json({ message: "Section already exists" });

    const section = await Section.create({ name });
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      return res.status(400).json({ message: "Old name and new name are required" });
    }

    
    const updatedSection = await Section.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true } 
    );

    if (!updatedSection) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json(updatedSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByIdAndDelete(id);
    if (!section) return res.status(404).json({ message: "Section not found" });

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllSectionsWithSubsections = async (req, res) => {
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

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Error fetching sections with subsections:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getAllProductsBySection = async (req, res) => {
  try {
    const { name } = req.body;  

    if (!name) {
      return res.status(400).json({ message: "Section name is required" });
    }

    const section = await Section.findOne({ name: new RegExp(`^${name}$`, "i") });
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const subsections = await Subsection.find({ section: section._id });
    const subsectionIds = subsections.map((sub) => sub._id);

    const categories = await Category.find({ subsection: { $in: subsectionIds } });
    const categoryIds = categories.map((cat) => cat._id);

    const products = await Product.find({ category: { $in: categoryIds } });

    res.status(200).json({
      section: section.name,
      products,
    });
  } catch (err) {
    console.error("Error in getAllProductsBySection:", err);
    res.status(500).json({ error: err.message });
  }
};
