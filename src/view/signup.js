import { userSignUp } from '../firebase-controller/signup-controller.js';

export default () => {
  const viewSignUp = `
                <aside class="aside">
                    <img class="foto" src="../img/home.svg" alt=""> 
                </aside>
                <form action="/" method="POST" id="signUpForm" class="signUpForm">
                    <img src="../img/logo-lab-black.svg" alt="Q&A" class="logo">  
                    <div><label>Una red social para preguntas y respuestas hecho por laboratorians y para laboratorians</label></div>
                    <div><img src="../img/logo-google.svg" alt="Google" class="googleIcon"></div>
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
  const divElement = document.createElement('div');
  divElement.classList.add('signUpContainer');
  divElement.innerHTML = viewSignUp;

  //   Fields validation
  const passwordField = divElement.querySelector('#password');
  const form = divElement.querySelector('#signUpForm');
  const errorElement = divElement.querySelector('#errorMessage');

  form.addEventListener('submit', (e) => {
    const messages = [];
    const passw = /^[A-Za-z]\w{6,20}$/;
    if (!passwordField.value.match(passw)) {
      messages.push('La contraseña debe tener al menos 6 caracteres, una letra y un número');
    }
    if (messages.length > 0) {
      e.preventDefault();
      errorElement.innerText = messages.join('  ');
    }
  });

  //   User registration in Firebase
  const signUpButton = divElement.querySelector('#signUpButton');
  signUpButton.addEventListener('click', userSignUp);

  return divElement;
};
