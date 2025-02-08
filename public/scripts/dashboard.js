document.addEventListener("DOMContentLoaded", async () => {
    // Load Header and Footer
    fetch("header.html").then(res => res.text()).then(data => document.getElementById("header").innerHTML = data);
    fetch("footer.html").then(res => res.text()).then(data => document.getElementById("footer").innerHTML = data);

    // Fetch product data
    const response = await fetch("/products");
    const { products, totalStock, lowStockCount, recentLocation } = await response.json();

    // Update summary cards
    document.getElementById("totalStock").textContent = `${totalStock}%`;
    document.getElementById("lowStock").textContent = `${lowStockCount}%`;
    document.getElementById("recentLocation").textContent = recentLocation || "No data";

    // Update product table
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = ""; // Clear previous data

    products.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.location}</td>
            <td>${product.stock}</td>
            <td class="${product.stock < 10 ? 'low-stock' : ''}">
                ${product.stock < 10 ? 'Low Stock!' : 'In Stock'}
            </td>
        `;

        tableBody.appendChild(row);
    });
});
