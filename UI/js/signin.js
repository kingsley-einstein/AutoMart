const form = document.getElementById('login_form');
const alertBox = document.getElementById('alert');

form.addEventListener('submit', (e) => {
  alertBox.classList.add('show', 'success');
  alertBox.textContent = 'Successfully Logged In';
  setTimeout(() => {
    alertBox.textContent = '';
    alertBox.classList.remove('show', 'success');
    location.assign('../views/dashboard.html');
  }, 2000);
  e.preventDefault();
});
