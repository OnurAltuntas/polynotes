import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyD5B3B_xSFF-fzJTbhjk-gTzu27olB-PCM',
  authDomain: 'polynotes-c42cd.firebaseapp.com',
  databaseURL: 'https://polynotes-c42cd.firebaseio.com',
  projectId: 'polynotes-c42cd',
  storageBucket: 'polynotes-c42cd.appspot.com',
  messagingSenderId: '686626006324',
  appId: '1:686626006324:web:2199de2c1bebd7b705f161',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
