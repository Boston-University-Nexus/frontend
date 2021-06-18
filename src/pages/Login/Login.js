import React, { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAs1ljfULG2AOeopwXIbBas2mPphRJ-sYI",
  authDomain: "bu-nexus.firebaseapp.com",
  databaseURL: "https://bu-nexus-default-rtdb.firebaseio.com",
  projectId: "bu-nexus",
  storageBucket: "bu-nexus.appspot.com",
  messagingSenderId: "856548405395",
  appId: "1:856548405395:web:0b8ccdc8ea5d4e82041d66",
  measurementId: "G-2BV1S8HE5L"
};

firebase.initializeApp(config);

const Login = () => {
  const [userLoggedIn, setUser] = useState('false');

  useEffect(() => {
    const user = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        setUser('true');
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          firebase
            .auth()
            .signInWithCustomToken(token)
            .then(() => { window.location.href = "/login"})
            .catch(console.error);
        }

        setUser('false');
      }
    })
  }, []);

  const signIn = () => {
    window.location.href = "https://shib-nexus.herokuapp.com/";
  }

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('success');
      window.location.href = "/login";
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <button className="pr-3" onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>

      <p>Status: {userLoggedIn}</p>
    </div>
  );
};

export default Login;
