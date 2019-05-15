const form = document.getElementById("sign_up_form");
const alertBox = document.getElementById("alert");

form.addEventListener("submit", (e) => {
     alertBox.classList.add("show", "success");
     alertBox.textContent = "Successfully Registered";
    setTimeout(() => {
        alertBox.textContent = "";
        alertBox.classList.remove("show", "success");
        location.assign("../views/signin.html");
    }, 2000);
    e.preventDefault();
});