export const inToUser = (user) => {
  const db = firebase.firestore();
  db.collection('users-qa')
    .doc(user.uid)
    .set(user)
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch(e => console.log('error', e));
};
