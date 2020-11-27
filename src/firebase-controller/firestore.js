export const setUser = (user) => {
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
        const photo = document.querySelector('#userPicture');
        const photoAside = document.querySelector('#userPic');
        name.innerText = myData.name;
        mail.innerText = myData.mail;
        photo.src = myData.photo;
        photoAside.src = myData.photo;
      }
      console.log('Document successfully got');
    })
    .catch(e => console.log('error', e));
};

export const updateUsername = (newname) => {
  const db = firebase.firestore();
  const uidDoc = firebase.auth().currentUser.uid;
  db.collection('users-qa')
    .doc(uidDoc)
    .update({
      name: newname,
    })
    .then(() => {
      getUser();
      console.log('Username updated');
    })
    .catch(e => console.log('error', e));
};
