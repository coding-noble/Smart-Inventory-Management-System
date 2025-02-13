import { getProducts } from "./api.js"
let productData;

document.addEventListener('DOMContentLoaded', () => {
    getProducts().then((data) => {
        productData = data;
        updateDisplayDetails();
    }).catch((error) => {
        console.log("Error fetching products:", error);
    });
});

function updateDisplayDetails() {
    if (!productData || productData.length === 0) {
        console.log("No product data available.");
        return;
    }

    let productCount = {};
    productData.forEach(product => {
        productCount[product.name] = (productCount[product.name] || 0) + 1;
    });

    let mostUsedProduct = Object.entries(productCount).reduce((max, entry) => entry[1] > max[1] ? entry : max, ["", 0])[0];
    document.getElementById("mostUsed").textContent = mostUsedProduct;

    let lowStockCount = productData.filter(product => product.quantity <= product.quantityAlert).length;
    let lowStockPercentage = ((lowStockCount / productData.length) * 100).toFixed(2);
    document.getElementById("lowStock").textContent = `${lowStockPercentage}%`;

    let locationMap = {};
    productData.forEach(product => {
        let location = product.location;
        if (location) {
            if (!locationMap[location._id]) {
                locationMap[location._id] = { name: location.name, __v: location.__v };
            } else {
                locationMap[location._id].__v += location.__v;
            }
        }
    });

    let mostUsedLocation = Object.values(locationMap).reduce((max, loc) => (loc.__v > max.__v ? loc : max), { __v: 0 });
    document.getElementById("usedtLocation").textContent = mostUsedLocation.name;

    console.log(productData)
}