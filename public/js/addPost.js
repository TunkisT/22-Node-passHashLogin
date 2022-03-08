const cardsDiv = document.querySelector('.cards');
const allPosts = document.querySelector('.all-posts');
const categories = document.querySelector('.categories');
const categoriesBtns = document.querySelector('.categories-buttons');

function addForm() {
  const postForm = document.querySelector('.forma');
  postForm.addEventListener('submit', (event) => {
    console.log('veikia');
    const postData = {
      title: event.target.elements.title.value,
      body: event.target.elements.body.value,
      category_id: event.target.elements.categories.value,
    };

    event.preventDefault();
    const token = localStorage.getItem('login_token');
    if (token === null) throw new Error('token not found');

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data);
      });
  });
}

function createCategories() {
  fetch('http://localhost:3000/categories')
    .then((res) => res.json())
    .then((data) => {
      data.map((cat) => {
        console.log(cat.category_id);
        categories.innerHTML += `<option value="${cat.category_id}">${cat.name}</option>`;
      });
    });
}

addForm();
createCategories();
