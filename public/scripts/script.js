import { getUsers } from "./api.js"

getUsers().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log("Error fetching users:", error);
});

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