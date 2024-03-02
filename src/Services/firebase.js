import React from 'react'
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDfmNo1PGGYlcNseCwY5ehgePNhJRHeWOo",
    authDomain: "webapp-4aee2.firebaseapp.com",
    projectId: "webapp-4aee2",
    storageBucket: "webapp-4aee2.appspot.com",
    messagingSenderId: "184172713670",
    appId: "1:184172713670:web:38a9de6997d299a87a69c7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default firebase;