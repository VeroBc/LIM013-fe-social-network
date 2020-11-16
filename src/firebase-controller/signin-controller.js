import { signinUserAccount } from '../firebase/autentication.js';

export const signinUser = (email, password) => {
  const errorMessage = document.getElementById('errorMessages');
  signinUserAccount(email, password)
    .then(() => {
      window.location.hash = '#/home';
    })
    .catch((e) => {
      errorMessage.innerHTML = e.message;
      return errorMessage;
    });
};
