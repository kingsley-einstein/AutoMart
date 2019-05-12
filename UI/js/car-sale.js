const adForm = document.querySelector("#ad_form");
//const fd = new FormData(adForm)
const alertBox = document.querySelector("#alert-box");

adForm.addEventListener("submit", (e) => {
    //fd.forEach((value, key) => console.log(value))
    alertBox.textContent = "Successfully posted AD";
    alertBox.classList.add("show", "success");
    setTimeout(() => alertBox.classList.remove("show", "success"), 2000);
    e.preventDefault();
    adForm.reset();
});