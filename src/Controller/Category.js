const Category = require("../Model/Category");
const Subsection = require("../Model/SubSection");
  const Product = require("../Model/Product");
exports.createCategory = async (req, res) => {
  try {
    const { name, subsectionName } = req.body;

    const subsection = await Subsection.findOne({ name: subsectionName });
    if (!subsection) return res.status(404).json({ message: "Subsection not found" });



    const category = await Category.create({
      name,
      subsection: subsection._id
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      return res.status(400).json({ message: "Old name and new name are required" });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subsection", "name");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const Category = await Category.findByIdAndDelete(id);
    if (!Category) return res.status(404).json({ message: "Section not found" });

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getCatWithproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const category= await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Section not found" });
    }

    const Product = await Product.find({ sectionId: id });

    res.status(200).json({
      category,
      Product
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
