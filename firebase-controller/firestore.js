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

export const getUsers = () => {
  const uidDoc = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection('users-qa').doc(uidDoc);
  return docRef.get()
    .then(doc => doc.data())
    .catch(e => console.log('error', e));
};

export const updateUsername = (newname) => {
  const uidDoc = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection('users-qa').doc(uidDoc);
  return docRef.update({ name: newname })
    .then(() => getUsers())
    .catch(e => console.log('error', e));
};

export const publishPost = (newPost, date) => {
  const uidDoc = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection('users-qa').doc(uidDoc);
  firebase.firestore().collection('posts').add({
    userRef: docRef,
    comment: newPost,
    date,
  });
};

export const processPostsList = ((queryResult) => {
  const arrayPromises = [];
  queryResult.forEach((doc) => {
    const postData = doc.data();
    // Este es el "then" de los users,
    // Que retorna una promesa del combinado con el Post y el User
    const newPromise = postData.userRef.get()
      .then(docUser => ({ ...postData, user: docUser.data() }));
    // Al final del primer "then" se pushea una promesa por cada post
    arrayPromises.push(newPromise);
  });
  // Al final del primer "then" retornamos una promesa.all de todos esas promesas pusheadas
  return Promise.all(arrayPromises);
});

export const processPostsProfile = ((queryResult) => {
  const arrayPromises = [];
  queryResult.forEach((doc) => {
    const postData = doc.data();
    const uidDoc = firebase.auth().currentUser.uid;
    if (postData.userRef.id === uidDoc) {
      const newPromise = postData.userRef.get()
        .then(docUser => ({ ...postData, user: docUser.data() }));
      arrayPromises.push(newPromise);
    }
  });
  return Promise.all(arrayPromises);
});

// export const getAllPosts = () => {
//   const postsRef = firebase.firestore().collection('posts');
//   return postsRef.get()
//     // Este es el "then" de los posts
//     .then(processPostsList)
//     .catch((error) => {
//       console.log('Error getting documents: ', error);
//     });
// };


//   privacy: status,
//   likes: [],


// export const getAllPosts = callback => postsRef
//   .onSnapshot((querySnapshot) => {
//     const allPosts = [];
//     querySnapshot.forEach((doc) => {
//       allPosts.push({ id: doc.id, ...doc.data() });
//     });
//     callback(allPosts);
//   });


/* export const getAllPosts = () => {
  const postsRef = firebase.firestore().collection('posts');
  return postsRef
    .get()
    .then((queryResult) => {
      queryResult.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
      return queryResult;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
}; */

//   .orderBy('time', 'desc')
