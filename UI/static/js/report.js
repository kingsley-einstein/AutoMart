const form = document.getElementById('fraud_form');
const alertBox = document.getElementById('alert-box');

form.addEventListener('submit', (e) => {
  alertBox.classList.add('show', 'success');
  alertBox.textContent = 'Successfully reported AD as fraud';
  setTimeout(() => {
    alertBox.textContent = '';
    alertBox.classList.remove('show', 'success');
  }, 2000);
  e.preventDefault();
  form.reset();
});
