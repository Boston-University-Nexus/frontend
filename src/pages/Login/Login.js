import React, { useEffect, useState } from "react";

import firebase from '../../lib/firebase';

const Login = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setLoginStatus(true);
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

        setLoginStatus(false);
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

      <p>Login Status: {loginStatus.toString()}</p>
    </div>
  );
};

export default Login;
