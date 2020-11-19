import { signOut, user } from '../firebase/autentication.js';

export const signOutUser = () => {
  signOut().then(() => {
    // eslint-disable-next-line no-console
    console.log('user is signed out');
    window.location.hash = '#/signin';
  });
};

export const loadInfoUser = () => {
  const currentUser = user();
  if (currentUser != null) {
  // const name = currentUser.displayName;
    const email = currentUser.email;
    // const photoUrl = currentUser.photoURL;
    // const emailVerified = currentUser.emailVerified;
    const uid = currentUser.uid;
    // eslint-disable-next-line no-console
    console.log(email, uid);
  }
};
