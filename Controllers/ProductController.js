const Product = require('../Models/Products');
//Creating and exporting new product
exports.createProduct = async (req, res) => {
  try {
    const { name, size, description, price, quantity, color } = req.body;
    const Product = new Product({ name, size, description, price, quantity, color });
    await Product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

//Updating and exporting existing product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; //where id is the product id to be updated
    const { name, size, description, price, quantity, color } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, size, description, price, quantity, color },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};