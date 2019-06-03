/**
 *
 * @param {string} id
 */
const displayBox = (id) => {
  const box = document.getElementById(id);
  box.classList.add('show');
};

/**
 *
 * @param {string} id
 */
const hideBox = (id) => {
  const box = document.getElementById(id);
  box.classList.remove('show');
};

const showAlert = () => {
  const alertBox = document.getElementById('alert-box');
  alertBox.textContent = 'Updated item price';
  alertBox.classList.add('show', 'success');
  setTimeout(() => {
    alertBox.textContent = '';
    alertBox.classList.remove('show', 'success');
  }, 2000);
};
