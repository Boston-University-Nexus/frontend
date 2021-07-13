import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import firebase from "../../lib/firebase";

const SignOut = () => {
  let history = useHistory();

  // signs out user and sends them to the home page
  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
        history.push("/");
      });
  });

  return <></>;
};

export default SignOut;
