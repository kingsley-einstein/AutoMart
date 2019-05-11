const hamburger = document.getElementById("hamburger");
const sidebarMobile = document.getElementById("sidebar-mobile");

hamburger.addEventListener("click", (e) => sidebarMobile.classList.toggle("show"));