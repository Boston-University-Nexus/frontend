import React, { Component } from "react";
import Contributor from "./Contributor";

import PhillipImg from "../../img/phillip.jpg";
import DanielImg from "../../img/daniel.jpg";
import VineetImg from "../../img/vineet.jpeg";
import UserImg from "../../img/user.png";

export default class About extends Component {
  render() {
    return (
      <div
        className="w-full h-full bg-blue-300 flex flex-col items-center justify-center"
        style={{ paddingTop: 72 }}
      >
        <div className="flex flex-col items-center w-11/12 lg:w-2/3 xl:1/2 h-full bg-gray-100 shadow-xl py-8">
          <h2 className="mb-3 text-4xl font-sans font-bold">Our team</h2>
          <div className="flex flex-wrap items-center justify-center">
            <Contributor
              name="Daniel Melchor"
              position="Full Stack Developer"
              img={DanielImg}
              linkedin="https://www.linkedin.com/in/dannymelchor"
            />
            <Contributor
              name="Vineet Raju"
              position="Back-end Developer"
              img={VineetImg}
              linkedin="https://www.linkedin.com/in/vineet-raju/"
            />
            <Contributor
              name="Phillip Tran"
              position="Full Stack Developer"
              img={PhillipImg}
              linkedin="https://www.linkedin.com/in/ptrandev/"
            />
            <Contributor
              name="Nic Nguyen"
              position="Back-end Developer"
              img={UserImg}
              linkedin=""
            />
            <Contributor
              name="Yuchen C"
              position="Lead Designer"
              img={UserImg}
              linkedin=""
            />
          </div>
        </div>
      </div>
    );
  }
}
