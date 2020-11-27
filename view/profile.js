import { uploadProfileImg } from '../firebase-controller/storage.js';
import { getUser, updateUsername } from '../firebase-controller/firestore.js';
import * as auth from '../firebase-controller/auth.js';

export default () => {
  const users = firebase.auth().currentUser;
  if (!users) {
    window.location.hash = '#/signin';
  }
  getUser();
  const viewProfile = `
    <nav class="menu-profile">
      <ul>
        <a href="#/profile"><img id="userPicture" class="img-user-profile"></a>
        <a href="#/home"><img src="./img/logo-lab-white.svg"></a>
        <a href="#"><i id="logout" class="fas fa-sign-out-alt logout-profile"></i></a>
      </ul>
    </nav>
    <section class="user-edit-profile">
      <img id="userPic" class="img-edit-user-profile">
      <i class="fas fa-camera camera-profile"></i>
      <input id="file" type ="file" accept="image/jpeg, image/png"/>
      <h3 id="userName" class="name-user">${users.email.match(/^([^@]*)@/)[1] || 'Username'}</h3>
      <i class="fas fa-pencil-alt icon-edit-profile" id="open"></i>
      <p class="correo-profile" id="userEmail">${users.email || 'mail@mail.com'}</p>
      <div id="mask" class="hidden"></div>
      <section id="modal" class="hidden">
        <form>
          <input class ="email-signin" type="text" id="updateName" placeholder="Nuevo nombre de usuario" required>
          <button id="save" class="submit-signin" type="submit">Guardar cambios</button>
        </form>
      </section>
    </section>
    <section class="post">
      <section class="own-post-profile">
        <i class="fas fa-ellipsis-v icon-more-profile"></i>
        <textarea class="text-own-post" disabled>Hola, ¿Alguien me puede recomendar un video de configuración de firebase?
        </textarea>
      </section>
    </section>
    `;

  document.getElementById('container').classList.remove('main');
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position-profile');
  sectionElement.innerHTML = viewProfile;

  const logout = sectionElement.querySelector('#logout');
  logout.addEventListener('click', () => {
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

  const open = sectionElement.querySelector('#open');
  const save = sectionElement.querySelector('#save');
  const modal = sectionElement.querySelector('#modal');
  const mask = sectionElement.querySelector('#mask');

  open.addEventListener('click', () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });

  save.addEventListener('click', () => {
    const username = document.querySelector('#updateName');
    const newname = username.value;
    updateUsername(newname);
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  return sectionElement;
};
