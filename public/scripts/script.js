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

      const response = await fetch("/products", {
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
  const res = await fetch("/products");
  const products = await res.json();

  products.forEach(product => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${product.name}</strong> - ${product.location} (Stock: ${product.stock})`;
      div.classList.add("product-item");
      productList.appendChild(div);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const editProductBtn = document.getElementById("editProductBtn");
  const productSelect = document.getElementById("productSelect");
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const form = document.getElementById("productForm");

  let editingProductId = null;

  // Load products into dropdown
  async function loadProductDropdown() {
      productSelect.innerHTML = '<option value="">Select a product...</option>';
      const res = await fetch("/products");
      const products = await res.json();

      products.forEach(product => {
          const option = document.createElement("option");
          option.value = product.id;
          option.textContent = `${product.name} - ${product.location}`;
          productSelect.appendChild(option);
      });
  }

  // Open edit modal when a product is selected
  editProductBtn.addEventListener("click", async () => {
      const selectedId = productSelect.value;
      if (!selectedId) {
          alert("Please select a product to edit.");
          return;
      }

      const res = await fetch(`/products/${selectedId}`);
      const product = await res.json();

      document.getElementById("productName").value = product.name;
      document.getElementById("productLocation").value = product.location;
      document.getElementById("productStock").value = product.stock;
      editingProductId = selectedId;

      modalTitle.textContent = "Edit Product";
      modal.style.display = "block";
  });

  // Handle product update
  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!editingProductId) return;

      const productData = {
          name: document.getElementById("productName").value,
          location: document.getElementById("productLocation").value,
          stock: document.getElementById("productStock").value,
      };

      const response = await fetch(`/products/${editingProductId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
      });

      if (response.ok) {
          modal.style.display = "none";
          loadProductDropdown(); // Refresh dropdown
      } else {
          alert("Error updating product.");
      }
  });

  // Load product dropdown on page load
  loadProductDropdown();
});

