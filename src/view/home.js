import { signOutUser } from '../view-controller/home-controller.js';

export default () => {
  const user = firebase.auth().currentUser;
  if (!user) {
    window.location.hash = '#/signin';
  }
  const viewHome = `
    <header class="mainHead">
        <img id="profileView" class="userPicture" src="${user.photoURL || './img/user-default.svg'}">
        <img src="./img/logo-lab-white.svg" alt="Q&A" class="logo">
        <i class="fas fa-sign-out-alt" id="signOutButton"></i>
    </header>
    <aside class="side">
        <img class="userPictureAside" src="${user.photoURL || './img/user-default.svg'}">
        <p class="userName">${user.displayName || 'Username'}</p>
        <p class="userEmail">${user.email || 'email@mail.com'}</p>
    </aside>
    <article class="content">
        <textarea class="inputPosts" placeholder="Escribe tu pregunta aquí" ></textarea>
        <button type="submit" id="postsButton">Publicar</button>
        <section class="publicSide">
            <img class="publicPicture" src="${user.photoURL || './img/user-default.svg'}">
            <p class="publicName">${user.displayName || 'Username'}</p>
            <textarea class="publicPosts">Hola chicas! Alguien podrá ayudarme con los arrays?</textarea>
        </section>
        <section class="publicSide">
            <img class="publicPicture" src="${user.photoURL || './img/user-default.svg'}">
            <p class="publicName">${user.displayName || 'Username'}</p>
            <textarea class="publicPosts">Hola! Alguien sabe como utilizar CSS grid?</textarea>
        </section>
        <section class="publicSide">
            <img class="publicPicture" src="${user.photoURL || './img/user-default.svg'}">
            <p class="publicName">${user.displayName || 'Username'}</p>
            <textarea class="publicPosts">Hola a todos! Alguien tendrá algun recurso de Git?</textarea>
        </section>
    </article> 
    
    `;
  //   document.getElementById('container').classList.remove('main');
  //   document.getElementById('container').classList.add('main');
  const sectionElement = document.createElement('div');
  sectionElement.classList.add('homeContainer');
  sectionElement.innerHTML = viewHome;

  const signOutButton = sectionElement.querySelector('#signOutButton');
  signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    signOutUser();
  });

  const profileView = sectionElement.querySelector('#profileView');
  profileView.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/profile';
  });

  return sectionElement;
};
