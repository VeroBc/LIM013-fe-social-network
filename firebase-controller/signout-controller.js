import { signOut } from '../firebase/autentication.js';

export const signOutUser = () => signOut()
  .then(() => {
    window.location.hash = '#/signin';
  });
