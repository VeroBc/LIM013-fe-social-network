import { signOutUser } from '../firebase-controller/signout-controller.js';

export default () => {
  const userPicture = localStorage.getItem('userpicture');
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('useremail');
  const viewHome = `
    <header class="mainHead">
        <img id="profileView" class="userPicture" src="${userPicture || './img/user-default.svg'}">
        <img src="./img/logo-lab-white.svg" alt="Q&A" class="logo">
        <i class="fas fa-sign-out-alt" id="signOutButton"></i>
    </header>
    <aside class="side">
        <img class="userPictureAside" src="${userPicture || './img/user-default.svg'}">
        <p class="userName">${userName || 'Username'}</p>
        <p class="userEmail">${userEmail || 'email@mail.com'}</p>
    </aside>
    <article class="content">
        <textarea class="inputPosts" placeholder="Escribe tu pregunta aquí" ></textarea>
        <button type="submit" id="postsButton">Publicar</button>
        <section class="publicSide">
            <img class="publicPicture" src="${userPicture || './img/user-default.svg'}">
            <p class="publicName">${userName || 'Username'}</p>
            <textarea class="publicPosts">Hola chicas! Alguien podrá ayudarme con los arrays?</textarea>
        </section>
        <section class="publicSide">
            <img class="publicPicture" src="${userPicture || './img/user-default.svg'}">
            <p class="publicName">${userName || 'Username'}</p>
            <textarea class="publicPosts">Hola! Alguien sabe como utilizar CSS grid?</textarea>
        </section>
        <section class="publicSide">
            <img class="publicPicture" src="${userPicture || './img/user-default.svg'}">
            <p class="publicName">${userName || 'Username'}</p>
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
