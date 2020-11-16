
import { signInWithGoogle } from '../firebase/autentication.js';

const provider = new firebase.auth.GoogleAuthProvider();

export const googleAccount = () => {
  const messageError = document.getElementById('errorMessage');
  signInWithGoogle(provider)
    .then(() => {
      window.location.hash = '#/home';
    })
    .catch((e) => {
      messageError.innerHTML = e.message;
      return messageError;
    });
};
