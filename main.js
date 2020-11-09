import { changeView } from './view-controller/router.js';
import { firebaseInit } from './firebase/config.js';

const init = () => {
  firebaseInit();
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
