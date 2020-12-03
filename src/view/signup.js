import * as auth from '../firebase-controller/auth.js';

export default () => {
  const viewSignUp = `
    <aside class="aside">
        <img class="foto" src="./img/home.svg" alt=""> 
    </aside>
    <form action="/" method="POST" id="signUpForm" class="signUpForm">
        <img src="./img/logo-lab-black.svg" alt="Q&A" class="logo">
        <label class="motto">Bienvenidas laboratorians!</label>
        <label class="motto">Haz tus preguntas y respuestas tecnológicas.</label>
        <div id="inputButton">
            <input type="email" placeholder="Correo electrónico" id="email" class="inputButton" required >
            <input type="password" placeholder="Contraseña" id="password" class="inputButton" required>
            <div id= "errorMessage"></div>
        </div>
        <button type="submit" id="signUpButton">Registrarse</button>
        <label class="altSignUp">O continua con</label>
        <img src="./img/logo-google.svg" alt="Google" class="googleIcon">
        <p class="motto">¿Tienes una cuenta?<a href="#/signin" class="login">Inicia sesión</a></p>
    </form>
    `;
  document.getElementById('container').classList.add('main');
  const divElement = document.createElement('div');
  divElement.classList.add('signUpContainer');
  divElement.innerHTML = viewSignUp;

  const form = divElement.querySelector('#signUpForm');
  const passwordField = divElement.querySelector('#password');
  const emailField = divElement.querySelector('#email');
  const google = divElement.querySelector('.googleIcon');
  //   Fields validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    auth.createUser(emailField.value, passwordField.value);
  });
  google.addEventListener('click', () => auth.googleAccount());
  return divElement;
};
