import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./api.js"
let productData;

document.addEventListener('DOMContentLoaded', () => {
    getProducts().then((data) => {
        productData = data;
        // console.log(productData);
        populateTableWithHTML();
        attachEventListeners();
    }).catch((error) => {
        console.log("Error fetching products:", error);
    });
});

function attachEventListeners() {
    const addButton = document.getElementById("addProductBtn");
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    addButton.addEventListener("click", handleAdd);

    editButtons.forEach((button) => {
        button.addEventListener("click", handleEdit);

    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDelete);
    });
}

function populateTableWithHTML() {
    const tableBody = document.getElementById('productTableBody');

    try {
        const rowsHTML = productData.map(product => {
            const stockStatus = product.quantity === 0
                ? "Out of Stock"
                : product.quantity <= product.quantityAlert
                    ? "Low Stock"
                    : "In Stock";

            const rowClass = product.quantity === 0
                ? "out-of-stock"
                : (product.quantity <= product.quantityAlert
                    ? "low-stock"
                    : "");
            return `
                <tr class="${rowClass}">
                    <td>${product.name}</td>
                    <td>${product.price}</td>  <td>${product.location.name}</td>
                    <td>${product.quantity}</td>
                    <td>${stockStatus}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">
                            <i class="fas fa-trash-alt"></i> 
                        </button>
                    </td> 
                    <td class="id-column">${product._id}</td>
                </tr>
            `;
        }).join('');

        tableBody.innerHTML += rowsHTML;
        document.getElementById('searchInput').addEventListener('input', filterTable);
    } catch (error) {
        console.log(error);
        tableBody.innerText = "You must be logged in.";
    }
}

function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const rows = document.querySelectorAll('#productTableBody tr'); // Select all rows inside the table body
    const noResultsRow = document.getElementById('noResultsRow');
    let matchFound = false;

    rows.forEach(row => {
        // Ignore the "No results" row
        if (row.id === 'noResultsRow') return;

        // Get all text content in the row (ignoring hidden elements)
        const rowText = row.textContent.toLowerCase();

        if (rowText.includes(searchInput)) {
            row.style.display = "";
            matchFound = true;
        } else {
            row.style.display = "none";
        }
    });

    // Show "No results" row if nothing matches
    noResultsRow.style.display = matchFound ? "none" : "";
}

async function handleDelete(event) {
    const row = event.target.closest("tr");
    const productId = row.querySelector(".id-column").textContent.trim();
    if (confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(productId);
        alert("Product deleted successfully!");

        row.remove();
    }
}

async function handleEdit(event) {
    const row = event.target.closest("tr");
    const productId = row.querySelector(".id-column").textContent.trim();

    let product;
    try {
        product = await getProduct(productId);
    } catch (error) {
        console.log("Error fetching product:", error);
        alert("Failed to fetch product data.");
        return;
    }

    if (product) {
        const modal = document.getElementById("productModal");
        modal.style.display = "block";

        document.getElementById("modalTitle").textContent = "Edit Product";
        document.getElementById("formSubmitButton").textContent = "Update Product";

        document.getElementById("editProductName").value = product.name;
        document.getElementById("editProductPrice").value = product.price;
        document.getElementById("editProductStock").value = product.quantity;
        document.getElementById("editQuantityAlert").value = product.quantityAlert;

        document.getElementById("editProductLocation").value = product.location ? product.location.name : '';

        const form = document.getElementById("productForm");
        form.onsubmit = async (event) => {
            event.preventDefault();
            const updatedName = document.getElementById("editProductName").value;
            const updatedPrice = parseFloat(document.getElementById("editProductPrice").value);
            const updatedQuantity = parseInt(document.getElementById("editProductStock").value);
            const updatedQuantityAlert = parseInt(document.getElementById("editQuantityAlert").value);
            const updatedLocation = document.getElementById("editProductLocation").value;

            if (updatedName && !isNaN(updatedPrice) && !isNaN(updatedQuantity) && !isNaN(updatedQuantityAlert)) {
                try {
                    await updateProduct(productId, {
                        name: updatedName,
                        price: updatedPrice,
                        quantity: updatedQuantity,
                        quantityAlert: updatedQuantityAlert,
                        location: updatedLocation
                    });

                    modal.style.display = "none";
                    alert("Product updated successfully!");
                    location.reload();
                } catch (error) {
                    console.log("Error updating product:", error);
                    alert("Failed to update product.");
                }
            } else {
                alert("Invalid input. Please check the form fields.");
            }
        };
    }
}

function handleAdd() {
    const modal = document.getElementById("productModal");
    modal.style.display = "block";

    document.getElementById("modalTitle").textContent = "Add New Product";
    document.getElementById("formSubmitButton").textContent = "Add Product";

    document.getElementById("editProductName").value = '';
    document.getElementById("editProductPrice").value = '';
    document.getElementById("editProductStock").value = '';
    document.getElementById("editQuantityAlert").value = '';
    document.getElementById("editProductLocation").value = '';

    const form = document.getElementById("productForm");
    form.onsubmit = async (event) => {
        event.preventDefault();

        const newName = document.getElementById("editProductName").value;
        const newPrice = parseFloat(document.getElementById("editProductPrice").value);
        const newQuantity = parseInt(document.getElementById("editProductStock").value);
        const newQuantityAlert = parseInt(document.getElementById("editQuantityAlert").value);
        const newLocation = document.getElementById("editProductLocation").value;

        if (newName && !isNaN(newPrice) && !isNaN(newQuantity) && !isNaN(newQuantityAlert)) {
            try {
                await createProduct({
                    name: newName,
                    price: newPrice,
                    quantity: newQuantity,
                    quantityAlert: newQuantityAlert,
                    location: newLocation
                });

                modal.style.display = "none";
                alert("Product added successfully!");
                location.reload();
            } catch (error) {
                console.log("Error adding product:", error);
                alert("Failed to add product.");
            }
        } else {
            alert("Invalid input. Please check the form fields.");
        }
    };
}

document.querySelector(".close").addEventListener("click", () => {
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
});
