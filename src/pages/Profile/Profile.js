import axios from "axios";
import React, { Component } from "react";
import config from "../../config";

// Images
import UserImg from "../../img/user.png";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
    };
  }

  componentDidMount() {
    let loggedIn;
    axios
      .get(config["server"] + "whoami")
      .then((res) => (loggedIn = true))
      .catch((err) => (loggedIn = false));

    // if (!loggedIn) window.location.replace(config["server"] + "login");
  }
  render() {
    return (
      <div
        className="flex flex-col w-11/12 lg:w-3/4 xl:1/2 h-full bg-white shadow-xl p-8"
        style={{ paddingTop: 72 }}
      >
        <h1 className="font-bold text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Your profile
        </h1>
        <div>
          <img src={UserImg} />
          <h2>Your information</h2>
          <p>Name</p>
          <p>BU ID</p>
          <p>Major</p>
          <p>Year</p>

          <h2>Your schedules</h2>
          <div className="">
            <p>Nexus Recommended</p>
            <p>Prioritize Major</p>
            <p>Prioritize Hubs</p>
            <p>Schedule 1</p>
          </div>
        </div>
      </div>
    );
  }
}
