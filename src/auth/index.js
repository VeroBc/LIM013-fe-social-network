import * as firebaseAuth from '../firebase/autentication.js';
import { inToUser, getUser } from '../firebase/store.js';

const provider = new firebase.auth.GoogleAuthProvider();
const imgDefault = 'gs://qa-lab-c5336.appspot.com/user-default.svg';
const errorMessage = document.getElementById('errorMessage');
const passw = /^[A-Za-z]\w{6,20}$/;

export const googleAccount = () => {
  firebaseAuth.signInWithGoogle(provider)
    .then(() => firebaseAuth.user())
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
      errorMessage.innerHTML = e.message;
      return errorMessage;
    });
};

export const createUser = (email, password) => {
  if (!password.match(passw)) {
    throw new Error('La contraseña debe tener al menos 6 caracteres, una letra y un número');
  }
  return firebaseAuth.createUserAccount(email, password)
    .then(() => firebaseAuth.user())
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

export const signinUser = (email, password) => {
  firebaseAuth.signinUserAccount(email, password)
    .then(() => firebaseAuth.user())
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

export const signOutUser = () => firebaseAuth.signOut()
  .then(() => {
    window.location.hash = '#/signin';
  });
