import { createUser } from '../firebase-controller/signup-controller.js';

export default () => {
  const viewSignUp = `
                <aside>
                    <h2 class="motto" >Una red social para preguntas y respuestas hecho por laboratorians y para laboratorians.</h2>
                </aside>
                <form action="/" method="POST" id="signUpForm" class="signUpForm">
                    <p>
                        <label>LOGO</label>
                    </p>
                    <p class="googleIcon" id="googleIcon">
                        <p>Registrarse con Google</p>
                    </p>
                    <p>
                        <label>O continua con</label>
                    </p>
                    <p>
                        <input type="text" placeholder="Crea un nombre de usuario" id="username" required>
                    </p>
                    <p>
                        <input type="email" placeholder="Ingresa tu correo electrónico" id="email" required >
                    </p>
                    <p>
                        <input type="password" placeholder="Ingresa tu contraseña" id="password" required>
                    </p>
                    <p>
                        <button type="submit" id="signUpButton">Registrarse</button>
                        <div id= "errorMessage"></div>
                    </p>
                    <p>¿Tienes una cuenta?</p>
                    <p><a href="#/signin">Iniciar sesión</a></p>
                </form>
                `;
  const divElement = document.createElement('div');
  divElement.classList.add('signUpContainer');
  //   divElement.classList.add('marco');
  divElement.innerHTML = viewSignUp;

  //   Fields validation
  const usernameField = divElement.querySelector('#username');
  const passwordField = divElement.querySelector('#password');
  const form = divElement.querySelector('#signUpForm');
  const errorElement = divElement.querySelector('#errorMessage');

  form.addEventListener('submit', (e) => {
    const messages = [];
    if (usernameField.value === '' || usernameField.value === null) {
      messages.push('Se requiere ingresar el nombre');
    }
    const passw = /^[A-Za-z]\w{6,20}$/;
    if (!passwordField.value.match(passw)) {
      messages.push('La contraseña debe tener al menos 6 caracteres y debe contener al menos una letra y un número');
    }
    if (messages.length > 0) {
      e.preventDefault();
      errorElement.innerText = messages.join('  ');
    }
  });

  //   User registration in Firebase
  const signUpButton = divElement.querySelector('#signUpButton');
  signUpButton.addEventListener('click', createUser);

  return divElement;
};
