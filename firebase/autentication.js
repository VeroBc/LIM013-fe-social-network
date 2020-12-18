const auth = () => firebase.auth();

export const createUserAccount = (email, password) => auth()
  .createUserWithEmailAndPassword(email, password);

export const signinUserAccount = (email, password) => auth()
  .signInWithEmailAndPassword(email, password);

export const persistenceUser = () => auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const signInWithGoogle = provider => auth()
  .signInWithPopup(provider);

export const signOut = () => auth().signOut();

export const user = () => auth().currentUser;
