import { user } from '../firebase/autentication.js';
import { signOutUser } from '../firebase-controller/signout-controller.js';
import { uploadProfileImg } from '../firebase/storage.js';

export default () => {
  const viewProfile = `
    <nav class="menu-profile">
      <ul>
        <a href="#/profile"><img class="img-user-profile" src="./img/user-default.svg"></a>
        <a href="#/home"><img src="./img/logo-lab-white.svg"></a>
        <a href="#"><i id="logout" class="fas fa-sign-out-alt logout-profile"></i></a>
      </ul>
    </nav>
    <section class="user-edit-profile">
      <h3 class="name-user">Sharon Huaman</h3>
      <img class="img-edit-user-profile" src="./img/user-default.svg">
      <i class="fas fa-camera camera-profile"></i>
      <input id="file" type ="file"/>
      <p class="correo-profile">sharonb.huaman@gmail.com</p>
      <i class="fas fa-pencil-alt icon-edit-profile" id="open"></i>
      <div id="mask" class="hidden"></div>
      <section id="modal" class="hidden">
        <form>
          <p>Nombre de usuario</p>
          <input class ="email-signin" type="text" id="name" name="user_mail" placeholder="Ingresa tu nombre" required>
          <p>Correo de usuario</p>
          <input class = "password-signin" type="password" id="email" name="user_password" placeholder="Ingresa tu contraseña" required>
          <p>Contraseña</p>
          <input class = "password-signin" type="password" id="password" name="user_password" placeholder="Ingresa tu contraseña" required>
          <input id="close" class="submit-signin" type="submit" id="signin" value="Guardar Cambios">
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
  const currentUser = user();
  const db = firebase.firestore();
  document.getElementById('container').classList.remove('main');
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position-profile');
  sectionElement.innerHTML = viewProfile;

  const logout = sectionElement.querySelector('#logout');
  logout.addEventListener('click', () => {
    signOutUser();
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
  const close = sectionElement.querySelector('#close');
  const modal = sectionElement.querySelector('#modal');
  const mask = sectionElement.querySelector('#mask');

  open.addEventListener('click', () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });
  close.addEventListener('click', () => {
    db.collection('users-qa').doc(currentUser.uid).update({
      mail: '',
      name: '',
      pass: '',
    });
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
  mask.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  return sectionElement;
};
