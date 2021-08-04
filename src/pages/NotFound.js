import { Component } from "react";

// 404 Page
class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="text-5xl w-1/2 text-center leading-relaxed">
          <span className="font-bold">404.</span> Whoops! We couldn't find what
          you were looking for.{" "}
          <a className="text-blue-500 hover:underline" href="/">
            Go back!
          </a>
        </div>
      </div>
    );
  }
}

export default NotFound;
