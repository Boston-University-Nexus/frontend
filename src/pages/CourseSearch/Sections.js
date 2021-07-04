import axios from "axios";
import React, { Component } from "react";
import CoursesRating from "./CoursesRating";
import {
  formatPrereqs,
  ratingToDiv,
  formatDaysLong,
  formatTime,
} from "./Utils";

export default class Sections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: {},
    };
  }

  async componentDidMount() {
    let query = window.location.search.split("=")[1];
    let college = query.substring(0, 3);
    let department = query.substring(3, 5);
    let number = query.substring(5, 8);
    let section = query.substring(8, 10);

    let res_section = await axios.get(
      "http://localhost:8000/api/sections?course__college=" +
        college +
        "&course__department=" +
        department +
        "&course__number=" +
        number +
        "&section=" +
        section
    );

    this.setState({
      data: res_section.data[0],
      loaded: true,
    });

    console.log(res_section.data[0]);
  }

  render() {
    let element = this.state.data;
    return (
      <div
        className="w-full md:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white shadow-2xl px-7 flex flex-col pb-5 min-h-full"
        style={{ paddingTop: 72 }}
      >
        {this.state.loaded && (
          <>
            <div>
              <span className="font-bold text-xl mr-4">
                {element.course.college} {element.course.department}{" "}
                {element.course.number} {element.section}
              </span>
              <span className="text-xl text-gray-700">{element.title}</span>
            </div>
            <div className="flex gap-2 my-4">
              <span className="px-4 font-bold bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                {element.workloadRatingNum} Ratings
              </span>
              {ratingToDiv(element.course.qualityRating, "Quality:")}
              {ratingToDiv(element.professorRating, "Professor:")}
              {ratingToDiv(element.workloadRating, "Workload:")}
              {ratingToDiv(element.course.difficultyRating, "Difficulty:")}
            </div>
            <div>
              <p className="text-gray-700 leading-loose">
                {element.description}
              </p>
            </div>
            <div className="mt-5 text-gray-700">
              <span className="mr-3">Prerequirements: </span>
              <span>{formatPrereqs(element.prereqs)}</span>
            </div>
            <div className="mb-5 text-gray-700">
              <span className="mr-3">Corequirements: </span>
              <span>{formatPrereqs(element.coreqs)}</span>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Section details{" "}
              </p>
              <p>Professor: {formatDaysLong(element.days)}</p>
              <p>Days: {formatDaysLong(element.days)}</p>
              <p>
                Time: {formatTime(element.start)}-{formatTime(element.end)}
              </p>
              <p>Type: {element.type}</p>
              <p>Room: {element.room || "To be decided"}</p>
            </div>
          </>
        )}
      </div>
    );
  }
}
