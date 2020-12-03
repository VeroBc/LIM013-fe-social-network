/* eslint-disable object-curly-newline */
import * as auth from '../firebase-controller/auth.js';
import { getUsers, processPostsList, publishPost } from '../firebase-controller/firestore.js';

export default () => {
  const viewHome = `
    <header class="mainHead">
        <img id="userPicture" class="userPicture">
        <img src="./img/logo-lab-white.svg" alt="Q&A" class="logo">
        <i class="fas fa-sign-out-alt" id="signOutButton"></i>
    </header>
    <aside class="side">
        <img id="userPic" class="userPictureAside">
        <input type="text" class="userName" id="userName" disabled> 
        <p class="userEmail" id="userEmail"></p>
    </aside>
    <article class="content">
        <textarea id="inputPosts" class="inputPosts" placeholder="Escribe tu pregunta aquí" ></textarea>
        <button type="submit" id="postsButton">Publicar</button>
        <div id="posts">Cargando...</div>
    </article> 
    `;
  const sectionElement = document.createElement('div');
  sectionElement.classList.add('homeContainer');
  sectionElement.innerHTML = viewHome;

  getUsers().then((userData) => {
    const name = sectionElement.querySelector('#userName');
    const mail = sectionElement.querySelector('#userEmail');
    const photo = sectionElement.querySelector('#userPicture');
    const photoAside = sectionElement.querySelector('#userPic');
    name.value = userData.name;
    mail.innerText = userData.mail;
    photo.src = userData.photo;
    photoAside.src = userData.photo;
  });

  firebase.firestore().collection('posts').orderBy('date', 'asc').onSnapshot((queryResult) => {
    processPostsList(queryResult).then((postsArray) => {
      const divSections = sectionElement.querySelector('#posts');
      divSections.innerHTML = '';
      postsArray.forEach((postData) => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <div class="publicSide">
            <img class="publicPicture" src="${postData.user.photo || './img/user-default.svg'}">
            <p class="publicName">${postData.user.name}</p>
            <p class="date">${postData.date}</p>
            <p class="publicPosts">${postData.comment}</p>
          </div>`;
        divSections.appendChild(postElement);
      });
    });
  });

  const postsButton = sectionElement.querySelector('#postsButton');
  postsButton.addEventListener('click', (e) => {
    const newPost = sectionElement.querySelector('#inputPosts').value;
    sectionElement.querySelector('#inputPosts').value = '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateTime = new Date().toLocaleDateString('es-AR', options);
    e.preventDefault();
    publishPost(newPost, dateTime);
  });

  const signOutButton = sectionElement.querySelector('#signOutButton');
  signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOutUser();
  });

  const profileView = sectionElement.querySelector('#userPicture');
  profileView.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/profile';
  });

  return sectionElement;
};


// insertar los posts, ya procesados, que jalamos de firebase
// Es un "postsArray" y no un "queryResult" pues ya no es exactamente lo que devuelve firebase
/*   getAllPosts().then((postsArray) => {
    const divSections = sectionElement.querySelector('#posts');
    divSections.innerHTML = '';
    postsArray.forEach((postData) => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
        <div class="publicSide">
          <img class="publicPicture" src="${postData.user.photo || './img/user-default.svg'}">
          <p class="publicName">${postData.user.name}</p>
          <p class="publicPosts">${postData.comment}</p>
        </div>`;
      divSections.appendChild(postElement);
    });
  }); */
/*   getAllPosts().then((queryResult) => {
    const divSections = sectionElement.querySelector('#posts');
    queryResult.forEach((doc) => {
      const postData = doc.data();
      postData.userRef.get().then((docUser) => {
        const userData = docUser.data();
        if (!userData) {
          console.error(`usuario no encontrado para post ${postData.uid}`);
          return;
        }
        const html = document.createElement('div');
        html.innerHTML = `
        <div class="publicSide">
          <img class="publicPicture" src="${userData.photo || './img/user-default.svg'}">
          <p class="publicName">${userData.name}</p>
          <textarea class="publicPosts">${postData.comment}</textarea>
        </div>`;
        divSections.appendChild(html);
      });
    });
  }); */
// getAllPosts().then((postsArray) => {
//   const divSections = sectionElement.querySelector('#posts');
//   divSections.innerHTML = '';
//   postsArray.forEach((postData) => {
//     const postElement = document.createElement('div');
//     postElement.innerHTML = `
//       <div class="publicSide">
//         <img class="publicPicture" src="${postData.user.photo || './img/user-default.svg'}">
//         <p class="publicName">${postData.user.name}</p>
//         <p class="publicPosts">${postData.comment}</p>
//       </div>`;
//     divSections.appendChild(postElement);
//   });
// });
