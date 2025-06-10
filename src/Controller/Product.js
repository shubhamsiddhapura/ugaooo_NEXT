  const Product = require("../Model/Product");
  const Category = require("../Model/Category");

  exports.createProduct = async (req, res) => {
    try {
      const { title, description, imageUrl, price, categoryName } = req.body;

      const category = await Category.findOne({ name: categoryName });
      if (!category) return res.status(404).json({ message: "Category not found" });

      const product = await Product.create({
        title,
        description,
        imageUrl,
        price,
        category: category._id,
        categoryName: category.name,
          
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, description, imageUrl, price, categoryName } = req.body;

    // Find the product by id first
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // If categoryName is provided, get category id
    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) return res.status(404).json({ message: "Category not found" });
      product.category = category._id;
      product.categoryName = category.name;
    }

    // Update all fields
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;
    if (price !== undefined) product.price = price;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate("category", "name");
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const Product = await Product.findByIdAndDelete(id);
    if (!Product) return res.status(404).json({ message: "Section not found" });

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};