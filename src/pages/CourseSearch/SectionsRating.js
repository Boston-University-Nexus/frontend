import axios from "axios";
import React, { Component } from "react";
import SliderRating from "./SliderRating";

import { GrClose } from "react-icons/gr";
import config from "../../config";

export default class SectionsRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ratings: [0, 0, 0, 0],
    };

    this.updateRating = this.updateRating.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  updateRating(toUpdate, val) {
    let prev = [...this.state.ratings];
    prev[toUpdate - 1] = val;
    this.setState({ ratings: prev });
  }

  async submitRating() {
    let section = this.props.section;
    let course =
      section.course.college +
      section.course.department +
      section.course.number;
    let ratings = this.state.ratings;
    let professorRating = ratings[0];
    let workloadRating = ratings[1];
    let qualityRating = ratings[2];
    let difficultyRating = ratings[3];
    let professor = section.professor.name;

    let data = {
      professorRating,
      workloadRating,
      qualityRating,
      difficultyRating,
      professor,
      course,
    };

    let res = await axios.post(config["server"] + "ratings/create/", data);

    this.setState({ open: false });
  }

  render() {
    let section = this.props.section;

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
                <span className="font-bold text-2xl w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                  Rating{" "}
                  {section.course.college +
                    section.course.department +
                    section.course.number +
                    " " +
                    section.professor.name}
                </span>
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
