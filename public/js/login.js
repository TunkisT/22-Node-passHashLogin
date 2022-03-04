const forma = document.forms.login;

forma.addEventListener('submit', (event) => {
  event.preventDefault();
  const info = {
    username: event.target.elements.username.value,
    password: event.target.elements.password.value,
  };
  console.log(info);
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
