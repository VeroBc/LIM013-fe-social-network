import { signInWithGoogle, user } from '../firebase/autentication.js';
import { inToUser, getUser } from '../firebase/store.js';

const provider = new firebase.auth.GoogleAuthProvider();

export const googleAccount = () => {
  const messageError = document.getElementById('errorMessage');
  signInWithGoogle(provider)
    .then(() => user())
    .then((currentUser) => {
      inToUser({
        uid: currentUser.uid,
        mail: currentUser.email,
        name: /^([^]+)@(\w+).(\w+)$/.exec(currentUser.email)[1],
      });
    })
    .then(() => getUser())
    .then(() => {
      window.location.hash = '#/home';
    })
    .catch((e) => {
      messageError.innerHTML = e.message;
      return messageError;
    });
};
