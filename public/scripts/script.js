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