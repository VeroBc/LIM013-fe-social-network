import * as db from '../firebase-controller/database.js';

export const eachPost = (postData) => {
  const postElement = document.createElement('div');
  postElement.innerHTML = `
    <div class="publicSide">
      <img class="publicPicture" src="${postData.user.photo || './img/user-default.svg'}">
      <p class="publicName">${postData.user.name}</p>
      <img src="./img/more_menu.svg" alt="menu" id="moreMenu-${postData.id}" class="moreMenu">
      <img src="./img/edit-text.svg" id="editText-${postData.id}" alt="editText" class="editText hidden">
      <img src="./img/delete.svg" id="deleteText-${postData.id}" alt="deleteText" class="deleteText hidden">
      <p class="date">${postData.date}</p>
      <p class="publicPosts" id="publicPosts-${postData.id}">${postData.comment}</p>
      <img src="./img/cancel.svg" id="cancelText-${postData.id}" alt="cancelText" class="cancelText hidden">
      <img src="./img/save.svg" id="saveText-${postData.id}" alt="saveText" class="saveText hidden">
    </div>`;
  const editText = postElement.querySelector(`#editText-${postData.id}`);
  const deleteText = postElement.querySelector(`#deleteText-${postData.id}`);
  const saveText = postElement.querySelector(`#cancelText-${postData.id}`);
  const cancelText = postElement.querySelector(`#saveText-${postData.id}`);
  const newComment = postElement.querySelector(`#publicPosts-${postData.id}`);
  postElement.querySelector(`#moreMenu-${postData.id}`)
    .addEventListener('click', () => {
      if (editText.style.display === 'none' && deleteText.style.display === 'none') {
        editText.style.display = 'block';
        deleteText.style.display = 'block';
        saveText.style.display = 'none';
        cancelText.style.display = 'none';
      } else {
        editText.style.display = 'none';
        deleteText.style.display = 'none';
        saveText.style.display = 'none';
        cancelText.style.display = 'none';
        newComment.contentEditable = false;
      }
    });
  postElement.querySelector(`#editText-${postData.id}`)
    .addEventListener('click', () => {
      if (saveText.style.display === 'none' && cancelText.style.display === 'none') {
        saveText.style.display = 'block';
        cancelText.style.display = 'block';
        newComment.contentEditable = true;
        newComment.focus();
      } else {
        saveText.style.display = 'none';
        cancelText.style.display = 'none';
        newComment.contentEditable = false;
      }
    });
  postElement.querySelector(`#saveText-${postData.id}`)
    .addEventListener('click', () => {
      const comment = postElement.querySelector(`#publicPosts-${postData.id}`);
      const newcomment = comment.textContent;
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const dateTime = new Date().toLocaleDateString('es-AR', options);
      saveText.style.display = 'none';
      cancelText.style.display = 'none';
      editText.style.display = 'none';
      deleteText.style.display = 'none';
      newComment.contentEditable = false;
      db.updatePost(postData.id, newcomment, dateTime);
    });
  postElement.querySelector(`#cancelText-${postData.id}`)
    .addEventListener('click', () => {
      const comment = postElement.querySelector(`#publicPosts-${postData.id}`);
      comment.textContent = `${postData.comment}`;
      saveText.style.display = 'none';
      cancelText.style.display = 'none';
      editText.style.display = 'none';
      deleteText.style.display = 'none';
      newComment.contentEditable = false;
    });
  postElement.querySelector(`#deleteText-${postData.id}`)
    .addEventListener('click', () => {
      db.deletePost(postData.id);
    });
  return postElement;
};
