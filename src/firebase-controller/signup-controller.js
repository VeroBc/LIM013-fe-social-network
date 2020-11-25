import { createUserAccount } from '../firebase/autentication.js';

export const createUser = (email, password) => {
  const messageError = document.getElementById('errorMessage');
  const passw = /^[A-Za-z]\w{6,20}$/;
  if (!password.match(passw)) {
    messageError.innerHTML = 'La contraseña debe tener al menos 6 caracteres, una letra y un número';
  } else {
    createUserAccount(email, password)
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        const docRef = firebase.firestore().collection('users').doc(currentUser.id);
        const users = docRef.set({
          name: currentUser.email.match(/^([^@]*)@/)[1],
          email: currentUser.email,
          uid: currentUser.uid,
        });
        console.log('here users', users);
        return users;
      })
      .then(() => {
        console.log('Success create collection');
        window.location.hash = '#/home';
      })
      .catch((e) => {
        messageError.innerHTML = e.message;
        return messageError;
      });
  }
};
