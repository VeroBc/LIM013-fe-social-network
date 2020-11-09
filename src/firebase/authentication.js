const auth = () => firebase.auth();

export const createUserAccount = (email, password) => auth()
  .createUserWithEmailAndPassword(email, password);
