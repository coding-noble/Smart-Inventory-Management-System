const BASE_API_URL = "http://localhost:3000";
const PRODUCTS_API_URL = BASE_API_URL + "/products";
const LOCATIONS_API_URL = BASE_API_URL + "/locations";
const USERS_API_URL = BASE_API_URL + "/users";

// Product Requests
async function getProducts() {
    const response = await fetch(PRODUCTS_API_URL);
    return response.json();
}

async function getProduct(productID) {
    const response = await fetch(`${PRODUCTS_API_URL}/${productID}`);
    return response.json();
}

async function createProduct(productData) {
    const response = await fetch(PRODUCTS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });
    return response.json();
}

async function updateProduct(productId, updatedData) {
    const response = await fetch(`${PRODUCTS_API_URL}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    return response.json();
}

async function deleteProduct(productID) {
    const response = await fetch(`${PRODUCTS_API_URL}/${productID}`, {
        method: "DELETE",
    });
    return response.json();
}

// Location Requests
async function getLocations() {
    const response = await fetch(LOCATIONS_API_URL);
    return response.json();
}

async function getLocation(locationID) {
    const response = await fetch(`${LOCATIONS_API_URL}/${locationID}`);
    return response.json();
}

async function createLocation(locationData) {
    const response = await fetch(LOCATIONS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationData),
    });
    return response.json();
}

async function updateLocation(locationId, updatedData) {
    const response = await fetch(`${LOCATIONS_API_URL}/${locationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    return response.json();
}

async function deleteLocation(locationID) {
    const response = await fetch(`${LOCATIONS_API_URL}/${locationID}`, {
        method: "DELETE",
    });
    return response.json();
}

// User Requests
async function getUsers() {
    const response = await fetch(USERS_API_URL);
    return response.json();
}

async function getUser(userID) {
    const response = await fetch(`${USERS_API_URL}/${userID}`);
    return response.json();
}

async function createUser(userData) {
    const response = await fetch(USERS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
}

async function updateUser(userId, updatedData) {
    const response = await fetch(`${USERS_API_URL}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    return response.json();
}

async function updateUsersAccessLevel(userId, accessLevelData) {
    const response = await fetch(`${USERS_API_URL}/upgrade/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accessLevelData),
    });
    return response.json();
}


async function deleteUser(userID) {
    const response = await fetch(`${USERS_API_URL}/${userID}`, {
        method: "DELETE",
    });
    return response.json();
}

export {
    // PRODUCTS
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    // LOCATIONS
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation,
    // USERS
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateUsersAccessLevel,
    deleteUser,
}