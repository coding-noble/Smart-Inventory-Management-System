// const mongoose = require('./db');
// const Location = require('../models/location');
// const Product = require('../models/product');

// const seedDatabase = async () => {
//     await Location.deleteMany({});
//     await Product.deleteMany({});

//     // Seed Locations
//     const location1 = new Location({
//         name: 'Warehouse A',
//         details: 'Main warehouse for electronics',
//         products: []
//     });

//     const location2 = new Location({
//         name: 'Warehouse B',
//         details: 'Secondary warehouse for furniture',
//         products: []
//     });

//     await location1.save();
//     await location2.save();

//     // Seed Products for Location 1
//     const productsForLocation1 = [];
//     for (let i = 0; i < 10; i++) {
//         const product = new Product({
//             name: `Product ${i + 1} (Electronics)`,
//             price: (i + 1) * 50,  // Price ranging from $50 to $750
//             quantity: (i + 1) * 10,  // Quantity ranging from 10 to 150
//             quantityAlert: 10,  // Alert when less than 10 in stock
//             location: location1._id
//         });

//         productsForLocation1.push(product);
//         await product.save();
//     }

//     // Seed Products for Location 2
//     const productsForLocation2 = [];
//     for (let i = 0; i < 10; i++) {
//         const product = new Product({
//             name: `Product ${i + 1} (Furniture)`,
//             price: (i + 1) * 75,  // Price ranging from $75 to $1125
//             quantity: (i + 1) * 5,  // Quantity ranging from 5 to 75
//             quantityAlert: 5,  // Alert when less than 5 in stock
//             location: location2._id
//         });

//         productsForLocation2.push(product);
//         await product.save();
//     }

//     // Update Locations with product references
//     location1.products = productsForLocation1.map(product => product._id);
//     location2.products = productsForLocation2.map(product => product._id);

//     await location1.save();
//     await location2.save();
// }

// seedDatabase().then(() => {
//     console.log("Seeded")
// })