const form = document.getElementById('sign_up_form');
const alertBox = document.getElementById('alert');
const loader = document.getElementById('loader');
const password = document.getElementById('password');
const confpassword = document.getElementById('confpassword');
const regBtn = document.getElementById('regBtn');

const sendToApi = async (data) => {
  const send = fetch('/api/v1/auth/signup', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return send.then(res => res.json());
};

const handleSubmit = async (signUpForm) => {
  const { elements } = signUpForm;
  const data = {};
  for (let i = 0; i < elements.length; i++) {
    const input = elements[i];
    const { name, value } = input;
    if (name && name !== 'confpassword') {
      data[name] = value;
    }
  }
  data.is_admin = false;
  // console.log(data);
  loader.classList.remove('hide');
  await sendToApi(data)
    .then((value) => {
      const { status, error } = value;
      const statusString = status.toString();
      if (/(4\d\d)|(5\d\d)/.test(statusString)) {
        alertBox.classList.add('show', 'error');
        alertBox.textContent = `${error}`;
        setTimeout(() => {
          loader.classList.add('hide');
          alertBox.textContent = '';
          alertBox.classList.remove('show', 'error');
        }, 2000);
        console.log(value);
      } else {
        alertBox.classList.add('show', 'success');
        alertBox.textContent = 'Successfully registered';
        setTimeout(() => {
          loader.classList.add('hide');
          alertBox.textContent = '';
          alertBox.classList.remove('show', 'success');
          window.location.assign('/login');
        }, 2000);
        form.reset();
        console.log(value);
      }
    })
    .catch((err) => {
      alertBox.classList.add('show', 'error');
      alertBox.textContent = 'Error occurred';
      setTimeout(() => {
        loader.classList.add('hide');
        alertBox.textContent = '';
        alertBox.classList.remove('show', 'error');
      }, 2000);
      console.log(err);
    });
};

form.addEventListener('submit', (e) => {
  handleSubmit(form);
  e.preventDefault();
});

confpassword.addEventListener('change', () => {
  // console.log(confpassword.value);
  if (confpassword.value !== password.value) {
    // console.log('Not match');
    regBtn.disabled = true;
    alertBox.classList.add('show', 'error');
    alertBox.textContent = 'Passwords do not match';
    setTimeout(() => {
      alertBox.textContent = '';
      alertBox.classList.remove('show', 'error');
    }, 2000);
  } else {
    regBtn.disabled = false;
  }
});
// console.log(confpassword);
// console.log(password);
