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
        name.value = myData.name;
        mail.innerText = myData.mail;
        photo.src = myData.photo;
        photoAside.src = myData.photo;
      }
      console.log('Document successfully got');
    })
    .catch(e => console.log('error', e));
};

// export const getNotes = callback => firebase.firestore().collection('users')
//   .onSnapshot((querySnapshot) => {
//     const data = [];
//     querySnapshot.forEach((doc) => {
//       data.push({ id: doc.id, ...doc.data() });
//     });
//     callback(data);
//   });


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


export const publishPost = (newPost, file, date) => {
  firebase.firestore().collection('posts').add({
    name: firebase.auth().currentUser.name,
    photo: firebase.auth().currentUser.name,
    post: newPost,
    image: file,
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

export const getAllPosts = () => {
  const postsRef = firebase.firestore().collection('posts');
  const arrayPromises = [];
  return postsRef.get()
    // Este es el "then" de los posts
    .then((queryResult) => {
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
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};

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
