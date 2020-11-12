// import { createUserAccount } from '../firebase/autentication.js';

// export const createUser = (email, password) => {
//   createUserAccount(email, password)
//     .then(() => {
//       window.location.hash = '#/home';
//     })
//     .catch((e) => {
//       const messageError = document.createElement('p');
//       messageError.innerHTML = e.message;
//       document.getElementById('container').appendChild(messageError);
//       return messageError;
//     });
// };

import { createUserAccount } from '../firebase/autentication.js';

export const userSignUp = () => {
  // const username = document.querySelector('#username');
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  createUserAccount(email, password);
};
