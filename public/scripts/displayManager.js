import { getProducts, getProduct, updateProduct, deleteProduct } from "./api.js"
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
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

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
5
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

        tableBody.innerHTML = rowsHTML;
    } catch (error) {
        console.log(error);
        tableBody.innerText = "You must be logged in.";
    }
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
    console.log("Needs Implementation");
}
