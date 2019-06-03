const form = document.getElementById('login_form');
const alertBox = document.getElementById('alert');
const loader = document.getElementById('loader');

const login = async (data) => {
  const send = fetch('/api/v1/auth/signin', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return send.then(res => res.json());
};

const handleSubmit = async (signInForm) => {
  const { elements } = signInForm;
  const sent = {};
  for (let i = 0; i < elements.length; i++) {
    const input = elements[i];
    const { name, value } = input;
    if (name) {
      sent[name] = value;
    }
  }
  // console.log(sent);
  loader.classList.remove('hide');
  await login(sent)
    .then(({ status, data, error }) => {
      const statusToString = status.toString();
      if (/(4\d\d)|(5\d\d)/.test(statusToString) && error) {
        alertBox.classList.add('show', 'error');
        alertBox.textContent = `${error}`;
        setTimeout(() => {
          loader.classList.add('hide');
          alertBox.classList.remove('show', 'error');
          alertBox.textContent = '';
        }, 2000);
      } else {
        alertBox.classList.add('show', 'success');
        alertBox.textContent = 'Successfully logged In';
        form.reset();
        setTimeout(() => {
          loader.classList.add('hide');
          alertBox.textContent = '';
          alertBox.classList.remove('show', 'success');
          // console.log(data);
          window.localStorage.setItem('id', data.id);
          window.location.assign('/dashboard');
        }, 2000);
      }
    })
    .catch((err) => {
      alertBox.classList.add('show', 'error');
      alertBox.textContent = 'An error occurred';
      setTimeout(() => {
        loader.classList.add('hide');
        alertBox.classList.remove('show', 'error');
        alertBox.textContent = '';
      }, 2000);
      console.log(err);
    });
};

form.addEventListener('submit', (e) => {
  handleSubmit(form);
  e.preventDefault();
});
