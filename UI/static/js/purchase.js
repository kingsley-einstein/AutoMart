const form = document.getElementById('purchase_form');
const alertBox = document.getElementById('alert');

form.addEventListener('submit', (e) => {
  alertBox.classList.add('show', 'success');
  alertBox.textContent = 'Successfully Made Purchase';
  setTimeout(() => {
    alertBox.textContent = '';
    alertBox.classList.remove('show', 'success');
    // location.assign("../views/signin.html");
  }, 2000);
  e.preventDefault();
});
