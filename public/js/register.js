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
  // console.log(registerData);

  const resp = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registerData),
  });

  const respInJs = await resp.json();

  if (respInJs.success === false) {
    handelErrors(respInJs.errors);
    console.log('respInJs.errors ===', respInJs.errors);
  }

  if (respInJs.success === true) {
    alert(`${respInJs.msg}`);
    window.location.replace(`index.html?username=${registerData.username}`);
  }
}
function handelErrors(errorArray) {
  console.log('errorArray ===', errorArray);
  errorsContainer.innerHTML = '';

  errorsContainer.innerHTML += `<p>${errorArray.message}</p>`;
}
