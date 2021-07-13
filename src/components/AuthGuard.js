import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import firebase from '../lib/firebase';

const AuthGuard = (props) => {
  let history = useHistory();
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState();

  // check if user is logged in and set state accordingly
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        history.push('/login') // redirect to login if user not authenticated
      }
    })
  })

  // shows children only if user is authenticated
  return (
    <>
    {isAuthenticated && children}
    </>
  )
}

export default AuthGuard
