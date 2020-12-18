export const eachComment = (postData) => {
  const postElement = document.createElement('div');
  postElement.innerHTML = `
  <div class="publicSide">
    <img class="publicPicture" src="${postData.user.photo || './img/user-default.svg'}">
    <p class="publicName">${postData.user.name}</p>
    <p class="date">${postData.date}</p>
    <p class="publicPosts">${postData.comment}</p>
    <img src="./img/like.svg" id="likeText-${postData.id}" alt="likeText" class="likeText">
    <img src="./img/liked.svg" id="likedText-${postData.id}" alt="likedText" class="likedText hidden">
    <img src="./img/comments.svg" id="commentsText-${postData.id}" alt="commentsText" class="commentsText">
  </div>`;
  const likeText = postElement.querySelector(`#likeText-${postData.id}`);
  const likedText = postElement.querySelector(`#likedText-${postData.id}`);
  likeText.addEventListener('click', () => {
    likedText.style.display = 'block';
    likeText.style.display = 'none';
  });
  likedText.addEventListener('click', () => {
    likeText.style.display = 'block';
    likedText.style.display = 'none';
  });
  return postElement;
};
