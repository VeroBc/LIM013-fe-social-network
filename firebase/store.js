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

export const getUser = () => {
  const db = firebase.firestore();
  const uidDoc = firebase.auth().currentUser.uid;
  db.collection('users-qa')
    .doc(uidDoc)
    .get()
    .then((doc) => {
      if (doc && doc.exists) {
        const myData = doc.data();
        const name = document.querySelector('#userName');
        const mail = document.querySelector('#userEmail');
        name.innerText = myData.name;
        mail.innerText = myData.mail;
      }
      console.log('Document successfully got');
    })
    .catch(e => console.log('error', e));
};
