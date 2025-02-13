const Product = require('../models/Product');
const Location = require("../models/Location")

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

const findOrCreateLocation = async (location) => {
    let foundLocation;

    if (location._id) {
        foundLocation = await Location.findById(location._id);
    } else if (typeof location === 'string') {
        foundLocation = await Location.findOne({ name: location });
    }

    if (!foundLocation) {
        const newLocation = await Location.create({
            name: location,
            details: "Needs description",
            products: []
        });
        console.log(`Created new location: ${newLocation.name}`);
        return newLocation;
    }

    return foundLocation;
};

// Create a new product
const createProduct = async (req, res) => {
    //#swagger.tags = ['Product']
    //#swagger.summary = 'Create a new product'
    const { name, price, quantity, quantityAlert, location } = req.body;

    try {
        console.log('Creating product with data:', req.body);

        const foundLocation = await findOrCreateLocation(location);
        const newProduct = await Product.create({
            name,
            price,
            quantity,
            quantityAlert,
            location: foundLocation._id
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};


// Update an existing product
const updateProduct = async (req, res) => {
    //#swagger.tags = ['Product']
    //#swagger.summary = 'Update a product'
    const { id } = req.params;
    const { name, price, quantity, quantityAlert, location } = req.body;

    try {
        const foundLocation = await findOrCreateLocation(location);
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, quantity, quantityAlert, location: foundLocation._id },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.name === 'VersionError') {
            return res.status(409).json({
                message: 'Conflict: The product has been updated by another user',
                error: error.message
            });
        }
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
