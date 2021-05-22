import { Component } from "react";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="flex w-full h-full justify-center items-center text-4xl">
        <a className="text-blue-500 hover:underline mx-5" href="/planner">
          Go to planner
        </a>
        <a className="text-blue-500 hover:underline mx-5" href="/coursesearch">
          Go to course search
        </a>
      </div>
    );
  }
}

export default Landing;
