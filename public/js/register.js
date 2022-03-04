const forma = document.forms.register;
const errorsContainer = document.querySelector('.errors');

forma.addEventListener('submit', (event) => {
  event.preventDefault();
  const registerData = {
    username: event.target.elements.username.value,
    password: event.target.elements.password.value,
  };
  registerUser(registerData);
});

async function registerUser(registerData) {
  console.log(registerData);

  const resp = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registerData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);

  if (respInJs.success === false) {
    handelErrors(respInJs.errors);
  }

  if (respInJs.success === true) {
    window.location.replace('login.html');
  }
}
function handelErrors(errorArray) {
  console.log('errorArray ===', errorArray);
  errorsContainer.innerHTML = '';
  errorArray.forEach((err) => {
    errorsContainer.innerHTML += `<p>${err.message}</p>`;
  });
}
