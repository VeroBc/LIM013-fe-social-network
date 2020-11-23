const googleProvider = new firebase.auth.GoogleAuthProvider();
const passw = /^[A-Za-z]\w{6,20}$/;

export const googleAccount = () => firebase.auth()
  .signInWithPopup(googleProvider)
  .then(() => {
    // window.location.hash = '#/home';
  });

export const signinUser = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .then((result) => {
    console.log(result);
    return result;
  });

export const createUser = (email, password) => {
  if (!password.match(passw)) {
    throw new Error('La contraseña debe tener al menos 6 caracteres, una letra y un número');
  }
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      return result;
    });
};

export const currentUser = () => firebase.auth().currentUser;

export const signOut = () => firebase.auth().signOut();
