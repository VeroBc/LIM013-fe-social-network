import * as auth from '../firebase-controller/auth.js';

export default () => {
  const viewSignIn = `
  <aside class="aside">
      <img class="foto" src="./img/home.svg" alt=""> 
  </aside>
  <form action="/" method="POST" id="signInForm" class="signUpForm">
      <img src="./img/logo-lab-black.svg" alt="Q&A" class="logo">
      <label class="motto">Bienvenidas laboratorians!</label>
      <label class="motto">Haz tus preguntas y respuestas tecnológicas.</label>
      <div id="inputButton">
          <input type="email" placeholder="Correo electrónico" id="mail" class="inputButton" required >
          <input type="password" placeholder="Contraseña" id="passwordSignIn" class="inputButton" required>
          <div id= "errorMessage"></div>
      </div>
      <button type="submit" id="signInButton">Iniciar sesión</button>
      <label class="altSignUp">O continua con</label>
      <img src="./img/logo-google.svg" alt="Google" class="googleIcon">
      <p class="motto">¿Tienes una cuenta?<a href="#/signup" class="login">Regístrate</a></p>
  </form>
  `;

  document.getElementById('container').classList.add('main');
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('signUpContainer');
  sectionElement.innerHTML = viewSignIn;

  const form = sectionElement.querySelector('#signInForm');
  const passwordField = sectionElement.querySelector('#passwordSignIn');
  const emailField = sectionElement.querySelector('#mail');
  const google = sectionElement.querySelector('.googleIcon');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    auth.signinUser(emailField.value, passwordField.value);
  });
  google.addEventListener('click', () => auth.googleAccount());
  return sectionElement;
};
