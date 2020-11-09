export default () => {
  const viewSignIn = `
  <img class="logo" src="../src/img/logo-lab-black.svg" alt="">
  <h3 class="center-text">Una red social para preguntas y respuestas hecho por laboratorians y para laboratorians.</h3>
  <img src="../src/img/home.svg">
  <form id="signup-form">
    <p>Inicia sesión para unir a la comunidad de apoyo</p>
    <button type="button"><img src="../src/img/logo-google.svg" alt="">Google</button>
    <p>O continua con<p>
    <label for="mail">Correo Electrónico</label>
    <input type="email" id="mail" name="user_mail">
    <label for="password">Contraseña</label>
    <input type="password" id="password" name="user_password">
    <input type="submit" id="signin" value="Iniciar Sesión">
    <p class="">¿No tienes una cuenta? <a href="#/"><span class="">Regístrate</span></a></p>
  </form>`;
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position');
  sectionElement.innerHTML = viewSignIn;
  return sectionElement;
};
