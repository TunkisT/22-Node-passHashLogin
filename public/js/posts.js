const cardsDiv = document.querySelector('.cards');
const allPosts = document.querySelector('.all-posts');
const addPosts = document.querySelector('.add-post');
const categories = document.querySelector('.categories');
const categoriesBtns = document.querySelector('.categories-buttons');

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

function createPosts() {
  cardsDiv.innerHTML = '';
  fetch('http://localhost:3000/posts')
    .then((res) => res.json())
    .then((posts) => {
      posts.map((post) => {
        const card = document.createElement('div');
        card.classList.add('card-div');
        card.innerHTML = `
          <h3>Title: ${post.title}</h3>
          <h4>Category: ${post.category}</h4>
          <p>${post.body}</p>
          <button class='delete' data-id='${post.post_id}'>Delete post</button>
          `;
        cardsDiv.append(card);
      });
    });

  cardsDiv.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete')) {
      const cardId = event.target.dataset.id;

      await fetch(`http://localhost:3000/posts/delete/${cardId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data ===', data);
          alert(data);
        });
      window.location.reload();
    }
  });
}

function createCategoriesButtons() {
  fetch('http://localhost:3000/categories')
    .then((res) => res.json())
    .then((data) => {
      data.map((cat) => {
        categoriesBtns.innerHTML += `<button class='cat' data-id='${cat.category_id}'>${cat.name}</button>`;
      });
    });
}

function createPostsById() {
  categoriesBtns.addEventListener('click', (event) => {
    event.preventDefault();
    cardsDiv.innerHTML = '';
    const buttonId = event.target.dataset.id;
    console.log('buttonId ===', buttonId);
    fetch(`http://localhost:3000/posts/category/${buttonId}`)
      .then((res) => res.json())
      .then((posts) => {
        posts.map((post) => {
          console.log(post);
          const card = document.createElement('div');
          card.classList.add('card-div');
          card.innerHTML = `
          <h3>Title: ${post.title}</h3>
          <h4>Category: ${post.category}</h4>
          <p>${post.body}</p>
          `;
          cardsDiv.append(card);
        });
      });
  });
}

allPosts.addEventListener('click', (event) => {
  event.preventDefault();
  createPosts();
});

addPosts.addEventListener('click', (event) => {
  window.location.reload();
});

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

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data);
      });
  });
}

// createCategories();

// addForm();

createPosts();

createCategoriesButtons();

createPostsById();
