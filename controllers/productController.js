const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    //#swagger.tags = ['Product']
    //#swagger.summary = 'Get All Products'
    try {
        const products = await Product.find().populate('location');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Get a single product by ID
const getSingleProduct = async (req, res) => {
    //#swagger.tags = ['Product']
    //#swagger.summary = 'Fetch a single product by ID'
    //#swagger.parameters['id'] = { description: 'Product ID' }

    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('location');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    //#swagger.tags = ['Product']
    //#swagger.summary = 'Create a new product'
    const { name, price, quantity, location } = req.body;

    try {
        const newProduct = await Product.create({ name, price, quantity, location });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    //#swagger.tags = ['Product']
    //#swagger.summary = ''
    const { id } = req.params;
    const { name, price, quantity, location } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, quantity, location },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    //#swagger.tags = ['Product']
    //#swagger.summary = ''
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
