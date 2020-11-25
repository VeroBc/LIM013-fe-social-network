import { createUserAccount, user } from '../firebase/autentication.js';
import { inToUser, getUser } from '../firebase/store.js';

const imgDefault = 'gs://qa-lab-c5336.appspot.com/user-default.svg';
export const createUser = (email, password) => {
  const messageError = document.getElementById('errorMessage');
  createUserAccount(email, password)
    .then(() => user())
    .then((currentUser) => {
      inToUser({
        uid: currentUser.uid,
        mail: currentUser.email,
        name: /^([^]+)@(\w+).(\w+)$/.exec(currentUser.email)[1],
        photo: imgDefault,
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
