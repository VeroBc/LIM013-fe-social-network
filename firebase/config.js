export const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDHL94lqAlNUPJmIf7Mj0t2MPGgg2sMOHo',
    authDomain: 'qa-lab-c5336.firebaseapp.com',
    databaseURL: 'https://qa-lab-c5336.firebaseio.com',
    projectId: 'qa-lab-c5336',
    storageBucket: 'qa-lab-c5336.appspot.com',
    messagingSenderId: '685761937793',
    appId: '1:685761937793:web:403924de63819967d6e880',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};
