import { Component } from "react";

// Landing page to decide course planner vs course search
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="flex w-full h-screen justify-center items-center text-4xl">
        <a
          className="text-white bg-blue-500 py-4 px-7 rounded transform hover:scale-105 mx-5"
          href="/planner"
        >
          Go to planner
        </a>
        <a
          className="text-white bg-blue-500 py-4 px-7 rounded transform hover:scale-105 mx-5"
          href="/coursesearch"
        >
          Go to course search
        </a>
      </div>
    );
  }
}

export default Landing;
