import axios from "axios";
import React, { Component } from "react";
import CoursesRating from "./CoursesRating";
import config from "../../config";
import {
  formatDays,
  formatPrereqs,
  formatProfessor,
  formatRating,
  formatTime,
  ratingToDiv,
} from "./Utils";
import { FiChevronRight } from "react-icons/fi";

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
      config["server"] +
        "courses?college=" +
        college +
        "&department=" +
        department +
        "&number=" +
        number
    );

    let res_sections = await axios.get(
      config["server"] +
        "sections?course__college=" +
        college +
        "&course__department=" +
        department +
        "&course__number=" +
        number
    );

    let professors = new Set();
    for (const section of res_sections.data) {
      professors.add(section.professor.name);
    }
    professors = Array.from(professors);

    this.setState({
      data: res_courses.data[0],
      professors,
      data_sections: res_sections.data,
      loaded: true,
    });
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
              <div
                id="breadcrumbs"
                className="flex items-center text-blue-500 mb-3 text-sm"
              >
                <a href="/coursesearch" className="hover:underline">
                  Home
                </a>
                <FiChevronRight />
                <a href="" className="hover:underline">
                  {element.college} {element.department} {element.number}
                </a>
              </div>
              <span className="font-bold text-xl mr-4">
                {element.college} {element.department} {element.number}
              </span>
              <span className="text-xl text-gray-700">{element.title}</span>
            </div>
            <div className="flex gap-2 my-4">
              <CoursesRating
                professors={this.state.professors}
                course={element.college + element.department + element.number}
              />
              <span className="font-bold rounded-full flex items-center justify-center text-gray-600">
                {element.difficultyRatingNum} Ratings:
              </span>
              {ratingToDiv(element.qualityRating, "Quality:")}
              {ratingToDiv(element.difficultyRating, "Difficulty:")}
            </div>
            <div className="mb-5 w-full mt-3">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Description
              </p>
              <p className="text-gray-700">{element.description}</p>
            </div>
            <div className="mb-5 w-full mt-3">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Requirements
              </p>
              <div className="text-gray-700">
                <span className="mr-3">Prerequirements: </span>
                <span>{formatPrereqs(element.prereqs)}</span>
              </div>
              <div className="text-gray-700">
                <span className="mr-3">Corequirements: </span>
                <span>{formatPrereqs(element.coreqs)}</span>
              </div>
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
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Prof. Rating
                    </th>
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Workload
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {this.state.data_sections.map((element) => {
                    let loc =
                      "/coursesearch/sections?section=" +
                      element.course.college +
                      element.course.department +
                      element.course.number +
                      element.section;
                    let prof =
                      "/coursesearch/professors?professor=" +
                      element.professor.name;
                    return (
                      <tr className="h-12 w-full text-gray-700 bg-indigo-50">
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {element.section}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {element.type || "-"}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatDays(element.days)}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatTime(element.start)}-{formatTime(element.end)}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = prof)}
                        >
                          {element.professor.name}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatRating(element.professorRating, "P")}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatRating(element.workloadRating, "W")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    );
  }
}
