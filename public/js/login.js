const forma = document.forms.login;
const errorsContainer = document.querySelector('.errors');

forma.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginData = {
    username: event.target.elements.username.value,
    password: event.target.elements.password.value,
  };
  loginUser(loginData);
});

const query = window.location.search;
if (query) {
  const usernameFromQuery = query.split('=')[1];
  forma.elements.username.value = usernameFromQuery;
}

async function loginUser(loginData) {
  console.log(loginData);

  const resp = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);

  if (respInJs.success === false) {
    handelErrors(respInJs.errors);
  }

  if (respInJs.success === true) {
    window.location.replace('profile.html');
  }
}
function handelErrors(errorArray) {
  console.log('errorArray ===', errorArray);
  errorsContainer.innerHTML = '';
  errorArray.forEach((err) => {
    errorsContainer.innerHTML += `<p>${err.message}</p>`;
  });
}
