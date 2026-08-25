const Product = require('../Models/Products'); // Import the Product model
//Creating and exporting new product
exports.createProduct = async (req, res) => {
  try {
    const { name, size, description, price, quantity, color } = req.body;
    const product = new Product({ name, size, description, price, quantity, color });
    await product.save();
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
    )
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};


//Getting products by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product retrieved successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};


//Getting all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};
