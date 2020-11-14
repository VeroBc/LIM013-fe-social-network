export default () => {
  const viewSignIn = `
  <img src="./img/home.svg" class="img-home">
  <form id="signin-form">
    <img class="logo-signin" src="./img/logo-lab-black.svg" alt="">
    <p class="text-signin">Una red social para preguntas y respuestas hecho por laboratorians y para laboratorians.</p>
    <button type="button" class="button-google-signin"><img src="./img/logo-google.svg" class="google-icon"alt="">Google</button>
    <div class="line">
      <span class="text-signin">
        O continua con
      </span>
    </div>
    <input class ="email-signin" type="email" id="mail" name="user_mail" placeholder="Ingresa tu correo electrónico">
    <input class = "password-signin" type="password" id="password" name="user_password" placeholder="Ingresa tu contraseña">
    <input class="submit-signin" type="submit" id="signin" value="Iniciar Sesión">
    <p class="text-signin">¿No tienes una cuenta? <a href="#/"><span class="change-form">Regístrate</span></a></p>
  </form>`;
  document.getElementById('container').classList.add('main');
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position-signin');
  sectionElement.innerHTML = viewSignIn;
  return sectionElement;
};
