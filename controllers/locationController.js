const Location = require('../models/Location');

// Get all locations
const getAllLocations = async (req, res) => {
    //#swagger.tags = ['Location']
    //#swagger.summary = ''
    try {
        const locations = await Location.find().populate('products');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch locations', error: error.message });
    }
};

// Get a single location by ID
const getSingleLocation = async (req, res) => {
    //#swagger.tags = ['Location']
    //#swagger.summary = 'Fetch a single location by ID'
    //#swagger.parameters['id'] = { description: 'Location ID' }

    try {
        const { id } = req.params;
        const location = await Location.findById(id).populate('products');

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch location', error: error.message });
    }
};

// Create a new location
const createLocation = async (req, res) => {
    //#swagger.tags = ['Location']
    //#swagger.summary = ''
    const { name, details, products } = req.body;

    try {
        const newLocation = await Location.create({ name, details, products });
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create location', error: error.message });
    }
};

// Update a location
const updateLocation = async (req, res) => {
    //#swagger.tags = ['Location']
    //#swagger.summary = ''
    const { id } = req.params;
    const { name, details, products } = req.body;

    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            id,
            { name, details, products },
            { new: true }
        );
        if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update location', error: error.message });
    }
};

// Delete a location
const deleteLocation = async (req, res) => {
    //#swagger.tags = ['Location']
    //#swagger.summary = ''
    const { id } = req.params;

    try {
        const deletedLocation = await Location.findByIdAndDelete(id);
        if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete location', error: error.message });
    }
};

module.exports = {
    getAllLocations,
    getSingleLocation,
    createLocation,
    updateLocation,
    deleteLocation,
};
