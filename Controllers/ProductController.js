const Product = require('../Models/Products'); // Import the Product model
const upload = require('../Middleware/upload'); // Import the upload middleware for handling file uploads

//Creating and exporting new product
exports.createProduct = async (req, res) => {
  try {
    const { name, size, description, price, quantity, color } = req.body;
    const product = new Product({ name, size, description, price, quantity, color });
    await product.save();

    //Send email notification to the admin that a new product has been created
    const sendEmail = require('../Middleware/emailsender');
    const subject = 'New Product Created';
    const text = `A new product has been created: \n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color}`;
    await sendEmail('festusoparaocha12@gmail.com', subject, text);
  

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

//Create and export new product with image upload
exports.createProductWithImage = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    try {
    if (err) {
      return res.status(400).json({ message: 'Error uploading image', error: err.message });
    }
    const { name, size, description, price, quantity, color } = req.body;

    if (!name || !size || !description || !price || !quantity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const product = new Product({ 
      name, 
      size,
      description,
      price, 
      quantity, 
      color, 
      image: req.file.path // Save the image path to the database 
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});
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
