const mongoose = require('./db');
const Location = require('../models/Location');
const Product = require('../models/Product');
const productNames = [
    'Laptop', 'Chair', 'Tablet', 'Monitor', 'Phone', 'Desk', 'Headphones', 'TV', 'Couch', 'Keyboard',
    'Smartwatch', 'Printer', 'Sofa', 'Coffee Table', 'Lamp', 'Washing Machine', 'Refrigerator', 'Microwave',
    'Blender', 'Fan', 'Speaker', 'Air Conditioner', 'Vacuum Cleaner', 'Camera', 'Drone', 'Electric Kettle',
    'Smartphone', 'Projector', 'Router', 'Carpet', 'Treadmill', 'Fitness Tracker', 'Wall Clock', 'Freezer',
    'Guitar', 'Table Lamp', 'Barbecue Grill', 'Food Processor', 'Bluetooth Speaker', 'Electric Fan', 'Juicer',
    'Recliner', 'Desk Chair', 'Bean Bag', 'Hair Dryer', 'Iron', 'Toaster', 'Smart TV', 'Electric Stove',
    'Cooktop', 'Waffle Maker', 'Microwave Oven', 'Rice Cooker', 'Hand Blender', 'Clothes Dryer'
];

// Random product data generator
const generateRandomProduct = (locationId, quantity = Math.floor(Math.random() * 15) + 1) => {
    const price = Math.floor(Math.random() * 500) + 50;
    const quantityAlert = Math.floor(Math.random() * 5) + 1;

    // Create the product
    return new Product({
        name: productNames[Math.floor(Math.random() * productNames.length)],
        price,
        quantity,
        quantityAlert,
        location: locationId
    });
};

// Seed Database
const seedDatabase = async () => {
    await Location.deleteMany({});
    await Product.deleteMany({});

    // Create 4 Locations
    const locationNames = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'];
    const locations = [];

    for (let i = 0; i < locationNames.length; i++) {
        const location = new Location({
            name: locationNames[i],
            details: 'needs description',
            products: []
        });
        locations.push(await location.save());
    }

    for (let i = 0; i < locations.length; i++) {
        const product = generateRandomProduct(locations[i]._id, 0);
        await product.save();
        locations[i].products.push(product._id);
        await locations[i].save();
    }

    for (let i = 0; i < 100; i++) {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const randomProduct = generateRandomProduct(randomLocation._id);
        await randomProduct.save();
        randomLocation.products.push(randomProduct._id);
        await randomLocation.save();
    }

    console.debug("Database successfully seeded!");
};

seedDatabase().then(() => {
    mongoose.connection.close();
}).catch((error) => {
    console.error("Error seeding database:", error);
});