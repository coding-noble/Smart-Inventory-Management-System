import { getProducts } from "./api.js"
let productData;

document.addEventListener('DOMContentLoaded', () => {
    getProducts().then((data) => {
        productData = data;
        console.log(productData);

        populateTableWithHTML();
    }).catch((error) => {
        console.log("Error fetching products:", error);
    });
});

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

        tableBody.innerHTML = rowsHTML;
    } catch (error) {
        console.log(error);
        tableBody.innerText = "You must be logged in.";
    }
}

