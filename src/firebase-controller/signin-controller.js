import { signinUserAccount, user } from '../firebase/autentication.js';
import { inToUser, getUser } from '../firebase/store.js';

const imgDefault = 'gs://qa-lab-c5336.appspot.com/user-default.svg';
export const signinUser = (email, password) => {
  const errorMessage = document.getElementById('errorMessages');
  signinUserAccount(email, password)
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
      errorMessage.innerHTML = e.message;
      return errorMessage;
    });
};
