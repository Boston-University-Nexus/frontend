import React, { Component } from "react";
import CoursesRating from "./CoursesRating";

import {
  formatDays,
  formatPrereqs,
  formatRating,
  formatTime,
  ratingToDiv,
} from "./Utils";
import { request } from "../../middlewares/requests";

// Icons
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

    let res_sections = await request.get(
      process.env.REACT_APP_SERVER + "sections?course_code=" + query
    );

    let professors = [];
    let prof_unique = [];

    for (const section of res_sections.data) {
      if (!prof_unique.includes(section.professor_name)) {
        professors.push([section.professor_name, section.professor_ID]);
        prof_unique.push(section.professor_name);
      }
    }

    this.setState({
      data: res_sections.data,
      professors,
      loaded: true,
    });
  }

  render() {
    let element = this.state.data[0];

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
                <p className="hover:underline">{element.course_code}</p>
              </div>
              <span className="font-bold text-xl mr-4">
                {element.course_code}
              </span>
              <span className="text-xl text-gray-700">
                {element.course_title}
              </span>
            </div>
            <div className="flex gap-2 my-4">
              <CoursesRating
                professors={this.state.professors}
                course={element}
              />
              <span className="font-bold rounded-full flex items-center justify-center text-gray-600">
                {element.course_difficultyRatingNum} Ratings:
              </span>
              {ratingToDiv(element.course_qualityRating, "Quality:")}
              {ratingToDiv(element.course_difficultyRating, "Difficulty:")}
            </div>
            <div className="mb-5 w-full mt-3">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Description
              </p>
              <p className="text-gray-700">{element.course_description}</p>
            </div>
            <div className="mb-5 w-full mt-3">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Requirements
              </p>
              <div className="text-gray-700">
                <span className="mr-3">Prerequirements: </span>
                <span>{formatPrereqs(element.course_prereqs)}</span>
              </div>
              <div className="text-gray-700">
                <span className="mr-3">Corequirements: </span>
                <span>{formatPrereqs(element.course_coreqs)}</span>
              </div>
            </div>
            <p className="text-lg mt-3 mb-1 font-bold">
              {this.state.data_sections.length} sections scheduled for{" "}
              {element.course_semester}
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
                  {this.state.data.map((element) => {
                    let loc =
                      "/coursesearch/sections?section=" +
                      element.course_code +
                      element.section_code;
                    let prof =
                      "/coursesearch/professors?professor=" +
                      element.professor_name;
                    return (
                      <tr className="h-12 w-full text-gray-700 bg-indigo-50">
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {element.section_code}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {element.section_type || "-"}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatDays(element.section_days)}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatTime(element.section_start)}-
                          {formatTime(element.section_end)}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = prof)}
                        >
                          {element.professor_name}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatRating(element.section_professorRating, "P")}
                        </td>
                        <td
                          className="px-3 cursor-pointer hover:text-blue-500"
                          onClick={() => (window.location = loc)}
                        >
                          {formatRating(element.section_workloadRating, "W")}
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
