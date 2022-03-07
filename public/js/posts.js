const cardsDiv = document.querySelector('.cards');

fetch('http://localhost:3000/posts')
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
      <button class='delete' data-id='${post.post_id}'>Delete post</button>
      `;
      cardsDiv.append(card);
    });
  });

cardsDiv.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete')) {
    const cardId = event.target.dataset.id;
    console.log('cardId ===', cardId);

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
