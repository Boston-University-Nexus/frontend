import React, { Component } from "react";
import Contributor from "./Contributor";

// Pictures
// import PhillipImg from "../../img/team/phillip.jpg";
import DanielImg from "../../img/team/daniel.jpg";
import VineetImg from "../../img/team/vineet.jpeg";
import NicImg from "../../img/team/nic.jpeg";
import YuchenImg from "../../img/team/yuchen.jpeg";

export default class About extends Component {
  render() {
    return (
      <div className="w-full h-full page bg-blue-300 flex flex-col items-center overflow-y-auto">
        <div className="flex flex-col items-center w-11/12 lg:w-3/4 xl:1/2 bg-gray-100 h-full shadow-xl py-10">
          <h2 className="text-4xl font-sans font-bold">Our team</h2>
          <div className="flex flex-col sm:grid md:grid-cols-2 gap-12 p-5 sm:p-12 items-center justify-center w-full sm:w-11/12 xl:w-4/5 2xl:w-2/3">
            <Contributor
              name="Daniel Melchor"
              position="Full Stack Developer"
              img={DanielImg}
              linkedin="https://www.linkedin.com/in/dannymelchor"
              description="API endpoints,Database,Course Search front-end/back-end,Authentication,Recommendation Algorithm,Planner front-end/back-end"
            />
            <Contributor
              name="Nic Nguyen"
              position="Founder & Back-end Developer"
              img={NicImg}
              linkedin=""
              description="Founder,Data scraping,Database,Not finished..."
            />
            <Contributor
              name="Vineet Raju"
              position="Founder & Back-end Developer"
              img={VineetImg}
              linkedin="https://www.linkedin.com/in/vineet-raju/"
              description="Founder,Data scraping,Extension,Not finished..."
            />
            <Contributor
              name="Yuchen C"
              position="Lead Designer"
              img={YuchenImg}
              linkedin=""
              description="Images and other art."
            />
            {/* <Contributor
              name="Phillip Tran"
              position="Full Stack Developer"
              img={PhillipImg}
              linkedin="https://www.linkedin.com/in/ptrandev/"
              description="Planner front-end and BU authentication system."
              active={false}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}
