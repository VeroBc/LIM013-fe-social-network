import { logginOut, loadInfoUser } from '../view-controller/home-controller.js';

export default () => {
  loadInfoUser();
  const viewHome = `
  <h1>Q&A LABORATORIA</h1>
  <button id="signOutButton">Cerrar sesión</button>
  `;
  document.getElementById('container').classList.remove('main');
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position');
  sectionElement.innerHTML = viewHome;

  const signOutButton = sectionElement.querySelector('#signOutButton');
  signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    logginOut();
  });
  return sectionElement;
};
