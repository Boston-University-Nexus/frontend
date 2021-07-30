import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import ProfessorRating from "./ProfessorRating";
import {
  formatDays,
  formatProfessor,
  formatRating,
  formatTime,
  ratingToDiv,
} from "./Utils";
import { FiChevronRight } from "react-icons/fi";

export default class Professors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prof: {},
      loaded: false,
      courses: [],
      sections: [],
    };
  }

  async componentDidMount() {
    let prof_name = window.location.search.split("=")[1];

    let res_prof = await axios.get(
      config["server"] + "professors?professor_name=" + prof_name
    );

    let res_sections = await axios.get(
      config["server"] + "sections?professor_name=" + prof_name
    );

    let courses = [];
    let courses_unique = [];

    for (const section of res_sections.data) {
      if (!courses_unique.includes(section.course_code)) {
        courses.push([section.course_code, section.course_ID]);
        courses_unique.push(section.course_code);
      }
    }

    this.setState({
      prof: res_prof.data[0],
      courses,
      loaded: true,
      sections: res_sections.data,
    });
  }

  render() {
    let prof = this.state.prof;

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
                  {prof.professor_name}
                </a>
              </div>
              <h1 className="font-bold text-xl mr-4">{prof.professor_name}</h1>
              <div className="flex gap-2 my-4">
                <ProfessorRating courses={this.state.courses} prof={prof} />
                <span className="font-bold flex items-center justify-center text-gray-600">
                  {prof.professor_ratingNum} Ratings:
                </span>
                {ratingToDiv(prof.professor_rating, "Quality:")}
              </div>
            </div>
            <p className="text-lg mt-3 mb-1 font-bold">
              {this.state.sections.length} sections this semester taught by{" "}
              {prof.name}
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
                      Prof. Rating
                    </th>
                    <th className="px-3 sticky top-0 bg-blue-100 border-b border-gray-400">
                      Workload
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {this.state.sections.map((element) => {
                    let loc =
                      "/coursesearch/sections?section=" +
                      element.course_code +
                      element.section_code;
                    return (
                      <tr
                        className="h-12 w-full text-gray-700 bg-indigo-50"
                        onClick={() => (window.location = loc)}
                      >
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {element.course_code} {element.section_code}
                        </td>
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {element.section_type || "-"}
                        </td>
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {formatDays(element.section_days)}
                        </td>
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {formatTime(element.section_start)}-
                          {formatTime(element.section_end)}
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
