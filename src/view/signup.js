import { createUser } from '../firebase-controller/signup-controller.js';

export default () => {
  const viewSignUp = `
                <aside class="aside">
                    <img class="foto" src="./img/home.svg" alt=""> 
                </aside>
                <form action="/" method="POST" id="signUpForm" class="signUpForm">
                    <img src="./img/logo-lab-black.svg" alt="Q&A" class="logo">  
                    <div><label>Una red social para preguntas y respuestas hecho por laboratorians y para laboratorians</label></div>
                    <div><img src="./img/logo-google.svg" alt="Google" class="googleIcon"></div>
                    <div class="optionSignUp"><label>O continua con</label></div>
                    <div id="inputButton">
                        <input type="email" placeholder="Correo Electrónico" id="email" class="inputButton" required >
                        <input type="password" placeholder="Contraseña" id="password" class="inputButton" required>
                        <div id= "errorMessage"></div>
                    </div>
                    <button type="submit" id="signUpButton">Registrarse</button>
                    <p>¿Tienes una cuenta?
                    <a href="#/signin" class="login">Inicia sesión</a></p>
                </form>
                `;
  document.getElementById('container').classList.remove('main');
  const divElement = document.createElement('div');
  divElement.classList.add('signUpContainer');
  divElement.innerHTML = viewSignUp;

  const form = divElement.querySelector('#signUpForm');
  const passwordField = divElement.querySelector('#password');
  const emailField = divElement.querySelector('#email');
  //   Fields validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createUser(emailField.value, passwordField.value);
  });
  return divElement;
};
