import { createUserAccount } from '../firebase/autentication.js';

export const createUser = (email, password) => {
  const messageError = document.getElementById('errorMessage');
  const passw = /^[A-Za-z]\w{6,20}$/;
  if (!password.match(passw)) {
    messageError.innerHTML = 'La contraseña debe tener al menos 6 caracteres, una letra y un número';
  } else {
    createUserAccount(email, password)
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((e) => {
        messageError.innerHTML = e.message;
        return messageError;
      });
  }
};
