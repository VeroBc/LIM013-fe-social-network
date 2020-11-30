import { uploadProfileImg } from '../firebase-controller/storage.js';
import { getUser, updateUsername } from '../firebase-controller/firestore.js';
import * as auth from '../firebase-controller/auth.js';

export default () => {
  const user = firebase.auth().currentUser;
  if (!user) {
    window.location.hash = '#/signin';
  }

  getUser();
  const viewProfile = `
    <header class="mainHead">
        <img id="userPicture" class="userPicture">
        <img src="./img/logo-lab-white.svg" alt="Q&A" class="logo">
        <i class="fas fa-sign-out-alt" id="signOutButton"></i>
    </header>
    <aside class="side">
        <img id="userPic" class="userPictureAside">
        <img src="./img/foto-camera.svg" class="camera-profile" alt="Camera">
        <input id="file" type ="file" accept="image/jpeg, image/png"/>
        <input type="text" class="userName" id="userName" disabled>
        <p class="userEmail" id="userEmail"></p>
        <button id="edit" class="edit" type="submit">Editar</button>
        <button id="cancel" class="cancel hidden" type="submit">Cancelar</button>
        <button id="saveChanges" class="saveChanges hidden" type="submit">Guardar</button>  
    </aside>
    <article class="content">
        <textarea class="inputPosts" placeholder="En que estas pensando?" ></textarea>
        <button type="submit" id="postsButton">Compartir</button>
        <section class="publicSide">
            <img class="publicPicture" src="${user.photoURL || './img/user-default.svg'}">
            <p class="publicName">${user.email.match(/^([^@]*)@/)[1] || 'Username'}</p>
            <textarea class="publicPosts">Hola chicas! Alguien podrá ayudarme con los arrays?</textarea>
        </section>
        <section class="publicSide">
            <img class="publicPicture" src="${user.photoURL || './img/user-default.svg'}">
            <p class="publicName">${user.email.match(/^([^@]*)@/)[1] || 'Username'}</p>
            <textarea class="publicPosts">Hola! Alguien sabe como utilizar CSS grid?</textarea>
        </section>
        <section class="publicSide">
            <img class="publicPicture" src="${user.photoURL || './img/user-default.svg'}">
            <p class="publicName">${user.email.match(/^([^@]*)@/)[1] || 'Username'}</p>
            <textarea class="publicPosts">Hola a todos! Alguien tendrá algun recurso de Git?</textarea>
        </section>
    </article> 
    
    `;
  const sectionElement = document.createElement('div');
  sectionElement.classList.add('homeContainer');
  sectionElement.innerHTML = viewProfile;

  const signOutButton = sectionElement.querySelector('#signOutButton');
  signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOutUser();
  });

  const camera = sectionElement.querySelector('.camera-profile');
  const file = sectionElement.querySelector('#file');
  camera.addEventListener('click', () => {
    file.click();
    file.addEventListener('change', () => {
      const photo = file.files[0];
      uploadProfileImg(photo);
    });
  });

  const edit = sectionElement.querySelector('#edit');
  const cancel = sectionElement.querySelector('#cancel');
  const saveChanges = sectionElement.querySelector('#saveChanges');
  edit.addEventListener('click', () => {
    document.getElementById('userName').disabled = false;
    edit.classList.add('hidden');
    saveChanges.classList.remove('hidden');
    cancel.classList.remove('hidden');
    document.getElementById('userName').focus();
  });

  cancel.addEventListener('click', () => {
    document.getElementById('userName').disabled = true;
    edit.classList.remove('hidden');
    saveChanges.classList.add('hidden');
    cancel.classList.add('hidden');
  });

  saveChanges.addEventListener('click', () => {
    document.getElementById('userName').disabled = true;
    edit.classList.remove('hidden');
    saveChanges.classList.add('hidden');
    cancel.classList.add('hidden');
    const username = document.querySelector('#userName');
    const newname = username.value;
    updateUsername(newname);
  });

  const profileView = sectionElement.querySelector('.logo');
  profileView.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/home';
  });

  return sectionElement;
};
