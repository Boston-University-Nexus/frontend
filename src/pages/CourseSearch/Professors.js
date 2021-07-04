import React, { Component } from "react";
import axios from "axios";
import ProfessorRating from "./ProfessorRating";
import { formatDays, formatProfessor, formatTime, ratingToDiv } from "./Utils";

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
      "http://localhost:8000/api/professors?name__icontains=" + prof_name
    );

    let res_sections = await axios.get(
      "http://localhost:8000/api/sections?professor__name__icontains=" +
        prof_name
    );

    let courses = new Set();
    for (const section of res_sections.data) {
      courses.add(
        section.course.college +
          section.course.department +
          section.course.number
      );
    }
    courses = Array.from(courses);

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
              <h1 className="font-bold text-xl mr-4">{prof.name}</h1>
              <div className="flex gap-2 my-4">
                <ProfessorRating courses={this.state.courses} prof={prof} />
                <span className="px-4 font-bold bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  {prof.ratingNum} Ratings
                </span>
                {ratingToDiv(prof.rating, "Quality:")}
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
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {this.state.sections.map((element) => {
                    let loc =
                      "/coursesearch/sections?section=" +
                      element.course.college +
                      element.course.department +
                      element.course.number +
                      element.section;
                    return (
                      <tr
                        className="h-12 w-full text-gray-700 bg-indigo-50"
                        onClick={() => (window.location = loc)}
                      >
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {element.course.college} {element.course.department}{" "}
                          {element.course.number} {element.section}
                        </td>
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {element.type || "-"}
                        </td>
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {formatDays(element.days)}
                        </td>
                        <td className="px-3 cursor-pointer hover:text-blue-500">
                          {formatTime(element.start)}-{formatTime(element.end)}
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
