import React, { Component } from "react";
import SliderRating from "./SliderRating";

export default class CoursesRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ratings: [0, 0, 0, 0],
    };

    this.updateRating = this.updateRating.bind(this);
  }

  updateRating(toUpdate, val) {
    let prev = [...this.state.ratings];
    prev[toUpdate] = val;
    this.setState({ ratings: prev });
  }

  render() {
    return (
      <>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-400 focus:outline-none"
          onClick={() => this.setState({ open: true })}
        >
          RATE
        </button>
        {this.state.open && (
          <div className="w-full h-full top-0 left-0 bg-black bg-opacity-50 absolute z-50 flex items-center justify-center">
            <div className="w-1/2 2xl:w-1/3 h-1/2 bg-white rounded-sm flex flex-col justify-evenly px-10">
              <SliderRating
                number={1}
                text={"rate your professor"}
                updateRating={this.updateRating}
                reverse={false}
              />
              <SliderRating
                number={2}
                text={"ammount of work needed"}
                updateRating={this.updateRating}
                reverse={true}
              />
              <SliderRating
                number={3}
                text={"the overall quality"}
                updateRating={this.updateRating}
                reverse={false}
              />
              <SliderRating
                number={4}
                text={"level of difficulty"}
                updateRating={this.updateRating}
                reverse={true}
              />
              <button className="px-4 py-2 font-bold text-white bg-blue-400 focus:outline-none">
                Submit
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
