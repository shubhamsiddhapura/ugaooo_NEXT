const Section = require("../Model/Section");
const Subsection = require("../Model/SubSection");
const Category = require("../Model/Category");

exports.createSubsection = async (req, res) => {
  try {
    const { name, sectionName } = req.body;

    const section = await Section.findOne({ name: sectionName });
    if (!section) return res.status(404).json({ message: "Section not found" });



    const subsection = await Subsection.create({
      name,
      section: section._id,sectionName
    });
    
    res.status(201).json(subsection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      return res.status(400).json({ message: "Old name and new name are required" });
    }

    // Find the subsection by oldName and update the name
    const updatedSubsection = await Subsection.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true }
    );

    if (!updatedSubsection) {
      return res.status(404).json({ message: "Subsection not found" });
    }

    res.status(200).json(updatedSubsection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllsubSections = async (req, res) => {
  try {
    const sections = await Subsection.find();
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { id } = req.params;

    const Subsection = await Subsection.findByIdAndDelete(id);
    if (!Subsection) return res.status(404).json({ message: "Section not found" });

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubSectionsWithCat = async (req, res) => {
  try {
    const { id } = req.params;

    const subsection= await Subsection.findById(id);
    if (!subsection) {
      return res.status(404).json({ message: "Section not found" });
    }

    const Category = await Category.find({ sectionId: id });

    res.status(200).json({
      subsection,
      Category
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
