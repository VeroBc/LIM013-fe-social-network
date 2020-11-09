import { changeTmp } from './view-controller/router.js';
import { firebaseInit } from './firebase/config.js';

const init = () => {
  firebaseInit();
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

window.addEventListener('load', init);