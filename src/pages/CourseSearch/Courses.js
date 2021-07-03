import axios from "axios";
import React, { Component } from "react";
import CoursesRating from "./CoursesRating";
import {
  formatDays,
  formatPrereqs,
  formatProfessor,
  formatTime,
} from "./Utils";

const ratingToDiv = (rating, text) => {
  rating = parseInt(rating) === -1 ? "TBD" : parseFloat(rating);
  let bg = "bg-gray-400";

  if (text === "Q" && rating !== "TBD") {
    if (rating < 1.66) bg = "bg-red-400";
    else if (rating < 3.33) bg = "bg-yellow-400";
    else bg = "bg-green-400";
  }

  return (
    <div className={"px-4 py-2 font-bold text-white " + bg}>
      {text + ": " + rating}
    </div>
  );
};

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: {},
      data_sections: [],
    };
  }

  async componentDidMount() {
    let query = window.location.search.split("=")[1];
    let college = query.substring(0, 3);
    let department = query.substring(3, 5);
    let number = query.substring(5, 8);

    let res_courses = await axios.get(
      "http://localhost:8000/api/courses?college=" +
        college +
        "&department=" +
        department +
        "&number=" +
        number
    );

    let res_sections = await axios.get(
      "http://localhost:8000/api/sections?course__college=" +
        college +
        "&course__department=" +
        department +
        "&course__number=" +
        number
    );

    this.setState({
      data: res_courses.data[0],
      data_sections: res_sections.data,
      loaded: true,
    });
  }

  render() {
    let element = this.state.data;
    return (
      <div
        className="w-full md:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white shadow-2xl px-7 flex flex-col pb-5"
        style={{ paddingTop: 72 }}
      >
        {this.state.loaded && (
          <>
            <div className="mb-4 flex items-center justify-between w-full">
              <div>
                <span className="font-bold text-xl mr-4">
                  {element.college} {element.department} {element.number}
                </span>
                <span className="text-xl text-gray-700">{element.title}</span>
              </div>
              <div className="flex gap-1">
                <CoursesRating />
                {ratingToDiv(element.qualityRating, "Q")}
                {ratingToDiv(element.difficultyRating, "D")}
              </div>
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
            <p className="text-lg mt-3 mb-1 font-bold">
              {this.state.data_sections.length} sections scheduled for{" "}
              {element.semester}
            </p>
            <div
              className="w-full overflow-y-auto mb-4"
              style={{ height: window.innerHeight / 2 }}
            >
              <table
                className="w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="w-full">
                  <tr className="h-12 w-full text-gray-700 text-left">
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Section
                    </th>
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Type
                    </th>
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Days
                    </th>
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Hours
                    </th>
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Professor
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {this.state.data_sections.map((element) => {
                    return (
                      <tr className="h-12 w-full text-gray-700 bg-indigo-50">
                        <td className="px-3">{element.section}</td>
                        <td className="px-3">{element.type || "-"}</td>
                        <td className="px-3">{formatDays(element.days)}</td>
                        <td className="px-3">
                          {formatTime(element.start)}-{formatTime(element.end)}
                        </td>
                        <td className="px-3">
                          {formatProfessor(element.professor.name)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="">
              <p className="text-lg mt-3 mb-1 font-bold">Course Ratings</p>
            </div>
          </>
        )}
      </div>
    );
  }
}
