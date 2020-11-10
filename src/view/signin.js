export default () => {
  const viewSignIn = `
  <img src="../src/img/home.svg" class="img-home a">
  <form id="signin-form" class="b">
    <img class="logo" src="../src/img/logo-lab-black.svg" alt="">
    <p class="description text">Una red social para preguntas y respuestas hecho por laboratorians y para laboratorians.</p>
    <button type="button" class="button-google"><img src="../src/img/logo-google.svg" class="google-icon"alt="">Google</button>
    <div class="line">
      <span class="text">
        O continua con
      </span>
    </div>
    <input class ="email" type="email" id="mail" name="user_mail" placeholder="Ingresa tu correo electrónico">
    <input class = "password" type="password" id="password" name="user_password" placeholder="Ingresa tu contraseña">
    <input class="submit" type="submit" id="signin" value="Iniciar Sesión">
    <p class="text">¿No tienes una cuenta? <a href="#/"><span class="change-form">Regístrate</span></a></p>
  </form>`;
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position');
  sectionElement.innerHTML = viewSignIn;
  return sectionElement;
};
