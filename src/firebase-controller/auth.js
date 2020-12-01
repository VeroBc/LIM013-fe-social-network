import * as firebaseAuth from '../firebase/autentication.js';
import { setUser, getUsers } from './firestore.js';

const provider = new firebase.auth.GoogleAuthProvider();
const imgDefault = './img/user-default.svg';
const passw = /^[A-Za-z]\w{6,20}$/;

export const googleAccount = () => {
  const errorMessage = document.getElementById('errorMessage');
  firebaseAuth.signInWithGoogle(provider)
    .then(() => firebaseAuth.user())
    .then((currentUser) => {
      setUser({
        uid: currentUser.uid,
        mail: currentUser.email,
        name: currentUser.email.match(/^([^@]*)@/)[1],
        photo: imgDefault,
      });
    })
    .then(() => getUsers())
    .then(() => {
      window.location.hash = '#/home';
    })
    .catch((e) => {
      errorMessage.innerHTML = e.message;
      return errorMessage;
    });
};

export const createUser = (email, password) => {
  const errorMessage = document.getElementById('errorMessage');
  if (!password.match(passw)) {
    errorMessage.innerHTML = 'La contraseña debe tener al menos 6 caracteres, una letra y un número';
  } else {
    firebaseAuth.createUserAccount(email, password)
      .then(() => firebaseAuth.user())
      .then((currentUser) => {
        setUser({
          uid: currentUser.uid,
          mail: currentUser.email,
          name: currentUser.email.match(/^([^@]*)@/)[1],
          photo: imgDefault,
        });
      })
      .then(() => getUsers())
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((e) => {
        errorMessage.innerHTML = e.message;
        return errorMessage;
      });
  }
};

export const signinUser = (email, password) => {
  const errorMessage = document.getElementById('errorMessage');
  firebaseAuth.signinUserAccount(email, password)
    .then(() => getUsers())
    .then(() => {
      window.location.hash = '#/home';
    })
    .catch((e) => {
      errorMessage.innerHTML = e.message;
      return errorMessage;
    });
};

export const signOutUser = () => firebaseAuth.signOut()
  .then(() => {
    window.location.hash = '#/signin';
  });
