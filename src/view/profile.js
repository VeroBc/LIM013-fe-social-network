export default () => {
  const user = firebase.auth().currentUser;
  if (!user) {
    window.location.hash = '#/signin';
  }
  const viewProfile = `
    <nav class="menu-profile">
      <ul>
        <a href="#/profile"><img class="img-user-profile" src="${user.photoURL || './img/user-default.svg'}"></a>
        <a href="#/home"><img src="./img/logo-lab-white.svg"></a>
        <a href="#"><i class="fas fa-sign-out-alt logout-profile"></i></a>
      </ul>
    </nav>
    <section class="user-edit-profile">
      <img class="img-edit-user-profile" src="${user.photoURL || './img/user-default.svg'}">
      <i class="fas fa-camera camera-profile"></i>
      <h3 class="name-user">${user.displayName || 'Username'}</h3>
      <p class="correo-profile">${user.email || 'email@mail.com'}</p>
      <i class="fas fa-pencil-alt icon-edit-profile" id="open"></i>
      <div id="mask" class="hidden"></div>
      <section id="modal" class="hidden">
        <p>Nombre de usuario</p>
        <input class ="email-signin" type="text"  value=${user.displayName || 'Username'} required>
        <p>Correo de usuario</p>
        <input class ="email-signin" type="email" id="email" name="user_mail" value=${user.email || 'email@mail.com'} required>
        <p>Contraseña</p>
        <input class = "password-signin" type="password" id="password" name="user_password" value=${user.password || 'password'} required>
        <button id="close" class="submit-signin">
          <i class="fas fa-save"></i>
          Guardar  Cambios
        </button>
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

  const open = sectionElement.querySelector('#open');
  const close = sectionElement.querySelector('#close');
  const modal = sectionElement.querySelector('#modal');
  const mask = sectionElement.querySelector('#mask');

  open.addEventListener('click', () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });
  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
  mask.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  return sectionElement;
};
