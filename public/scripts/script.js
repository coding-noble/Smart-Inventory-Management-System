function toggleMenu() {
  const sideMenu = document.getElementById("sideMenu");
  sideMenu.classList.toggle("open");
}

function toggleSearch() {
  const searchIcon = document.querySelector(".search-icon");
  const searchBox = document.getElementById("searchBox");

  if (searchBox.classList.contains("show-input")) {
    searchBox.classList.remove("show-input");
    searchIcon.style.transform = "rotate(0deg)";
  } else {
    searchBox.classList.add("show-input");
    searchIcon.style.transform = "rotate(90deg)";
  }
}

window.toggleMenu = toggleMenu;
window.toggleSearch = toggleSearch;

document.addEventListener("DOMContentLoaded", async () => {
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("addProductModal");
  const closeModal = document.querySelector(".close");

  // Open modal
  openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
  });

  // Close modal
  closeModal.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Handle form submission
  document.getElementById("addProductForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const newProduct = {
          name: document.getElementById("newProductName").value,
          location: document.getElementById("newProductLocation").value,
          stock: document.getElementById("newProductStock").value,
      };

      const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
      });

      if (response.ok) {
          alert("Product added successfully!");
          modal.style.display = "none";
          window.location.reload(); // Refresh to show new product
      } else {
          alert("Error adding product.");
      }
  });

  // Fetch & display products
  const productList = document.getElementById("productList");
  const res = await fetch("/api/products");
  const products = await res.json();

  products.forEach(product => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${product.name}</strong> - ${product.location} (Stock: ${product.stock})`;
      div.classList.add("product-item");
      productList.appendChild(div);
  });
});


