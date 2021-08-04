import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { stateSetExtensionKey } from "../state/actions";

function Callback(props) {
  const [received, setReceived] = useState(false);

  useEffect(() => {
    const key = window.location.search.split("=")[1];
    stateSetExtensionKey(key);
    setReceived(true);
  }, []);

  return <div>{received && <Redirect to="/planner" />}</div>;
}

// Redux
const mapDispatchToProps = (dispatch) => {
  return {
    stateSetExtensionKey: (classes) => dispatch(stateSetExtensionKey(classes)),
  };
};

export default connect(null, mapDispatchToProps)(Callback);
