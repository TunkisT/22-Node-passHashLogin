const forma = document.forms.login;

forma.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginData = {
    username: event.target.elements.username.value,
    password: event.target.elements.password.value,
  };
  loginUser(loginData);
});

async function loginUser(loginData) {
  console.log(loginData);

  const resp = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });
  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);
}
