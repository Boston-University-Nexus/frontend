import axios from "axios";
import React, { Component } from "react";
import SliderRating from "./SliderRating";

import { GrClose } from "react-icons/gr";

export default class ProfessorRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ratings: [0, 0, 0, 0],
      selected_course: "",
    };

    this.updateRating = this.updateRating.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  updateRating(toUpdate, val) {
    let prev = [...this.state.ratings];
    prev[toUpdate - 1] = val;
    this.setState({ ratings: prev });
  }

  componentDidMount() {
    this.setState({ selected_course: this.props.courses[0] });
  }

  async submitRating() {
    let course = this.state.selected_course;
    let ratings = this.state.ratings;
    let professorRating = ratings[0];
    let workloadRating = ratings[1];
    let qualityRating = ratings[2];
    let difficultyRating = ratings[3];
    let professor = this.props.prof.name;

    let data = {
      professorRating,
      workloadRating,
      qualityRating,
      difficultyRating,
      professor,
      course,
    };

    let res = await axios.post(
      "http://localhost:8000/api/ratings/create/",
      data
    );

    this.setState({ open: false });
  }

  render() {
    let courses = this.props.courses;
    let prof = this.props.prof;

    return (
      <>
        <button
          className="px-4 py-1 mr-3 font-bold text-white bg-blue-400 focus:outline-none rounded-sm border-b-2 border-r-2 border-blue-600 hover:bg-blue-500"
          onClick={() => this.setState({ open: true })}
        >
          RATE
        </button>
        {this.state.open && (
          <div
            className="w-full h-full top-0 left-0 bg-black bg-opacity-50 absolute z-50 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              this.setState({ open: false });
            }}
          >
            <div
              className="w-1/2 2xl:w-1/3 h-1/2 bg-white rounded-sm flex flex-col justify-evenly px-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <GrClose
                onClick={() => this.setState({ open: false })}
                className="absolute right-5 top-5 cursor-pointer"
              />
              <div className="flex">
                <span className="font-bold text-2xl w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  Rating {prof.name}
                </span>
                <select
                  className="text-2xl bg-white border-none focus:outline-none cursor-pointer"
                  onChange={(e) =>
                    this.setState({ selected_course: e.target.value })
                  }
                >
                  {courses.map((element, idx) => {
                    return (
                      <option
                        value={element}
                        key={idx}
                        className="cursor-pointer"
                      >
                        {element}
                      </option>
                    );
                  })}
                </select>
              </div>
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
              <button
                className="px-4 py-2 font-bold text-white bg-blue-400 focus:outline-none rounded-sm border-b-2 border-r-2 border-blue-600 hover:bg-blue-500"
                onClick={this.submitRating}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
