import React, { Component } from "react";
import { request } from "../../middlewares/requests";
import CoursesRating from "./CoursesRating";

import SectionsRating from "./SectionsRating";
import {
  formatPrereqs,
  ratingToDiv,
  formatDaysLong,
  formatTime,
  formatProfessor,
} from "./Utils";
import { FiChevronRight } from "react-icons/fi";

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
    let course = query.substring(0, 8);
    let section = query.substring(8, 10);

    let res_section = await request.get(
      process.env.REACT_APP_SERVER +
        "sections?course_code=" +
        course +
        "&section_code=" +
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
              <div
                id="breadcrumbs"
                className="flex items-center text-blue-500 mb-3 text-sm"
              >
                <a href="/coursesearch" className="hover:underline">
                  Home
                </a>
                <FiChevronRight />
                <a
                  href={
                    "/coursesearch/courses?course=" +
                    element.course_code.replaceAll(" ", "")
                  }
                  className="hover:underline"
                >
                  {element.course_code}
                </a>
                <FiChevronRight />
                <a href="" className="hover:underline">
                  {element.course_code + " " + element.section_code}
                </a>
              </div>
              <span className="font-bold text-xl mr-4">
                {element.course_code} {element.section_code}
              </span>
              <span className="text-xl text-gray-700">
                {element.section_title}
              </span>
            </div>
            <div className="flex gap-1 my-4">
              <SectionsRating section={element} />
              <span className="font-bold rounded-full flex items-center justify-center text-gray-600">
                {element.course_workloadRatingNum} Ratings:
              </span>
              {ratingToDiv(element.course_qualityRating, "Quality:")}
              {ratingToDiv(element.section_professorRating, "Professor:")}
              {ratingToDiv(element.section_workloadRating, "Workload:")}
              {ratingToDiv(element.course_difficultyRating, "Difficulty:")}
            </div>
            <div className="mb-5 w-full mt-3">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Description
              </p>
              <p className="text-gray-700">{element.course_description}</p>
            </div>
            <div className="mb-5 w-full">
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
            <div className="mb-5 w-full">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Section details
              </p>
              <ul>
                <li>Professor: {formatProfessor(element.professor_name)}</li>
                <li>Days: {formatDaysLong(element.section_days)}</li>
                <li>
                  Time: {formatTime(element.section_start)}-
                  {formatTime(element.section_end)}
                </li>
                <li>Type: {element.section_type}</li>
                <li>Room: {element.section_room || "To be decided"}</li>
              </ul>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Other
              </p>
              <a
                className="px-4 py-1 mr-3 font-bold text-gray-500 bg-gray-200 focus:outline-none rounded-sm border-b-2 border-r-2 border-gray-400 hover:bg-gray-300 cursor-pointer"
                href={
                  "/coursesearch/courses?course_code=" +
                  element.course_code.replaceAll(" ", "")
                }
              >
                See other sections of this course
              </a>
              <a
                className="px-4 py-1 mr-3 font-bold text-gray-500 bg-gray-200 focus:outline-none rounded-sm border-b-2 border-r-2 border-gray-400 hover:bg-gray-300 cursor-pointer"
                href={
                  "/coursesearch/professors?professor=" + element.professor_name
                }
              >
                See other courses by this professor
              </a>
            </div>
          </>
        )}
      </div>
    );
  }
}
