import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import firebase from '../../lib/firebase';

const Login = () => {
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          firebase
            .auth()
            .signInWithCustomToken(token)
            .then(() => { history.push("/") })
            .catch(console.error);
        } else {
          window.location.href = "https://shib-nexus.herokuapp.com/";
        }
      }
    })
  });

  return (
    <></>
  );
};

export default Login;
