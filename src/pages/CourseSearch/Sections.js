import axios from "axios";
import React, { Component } from "react";
import CoursesRating from "./CoursesRating";
import config from "../../config";
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
    let college = query.substring(0, 3);
    let department = query.substring(3, 5);
    let number = query.substring(5, 8);
    let section = query.substring(8, 10);

    let res_section = await axios.get(
      config["server"] +
        "api/sections?course__college=" +
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
    let class_name = "";
    if (element.course)
      class_name =
        element.course.college +
        " " +
        element.course.department +
        " " +
        element.course.number;

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
                    class_name.replaceAll(" ", "")
                  }
                  className="hover:underline"
                >
                  {class_name}
                </a>
                <FiChevronRight />
                <a href="" className="hover:underline">
                  {class_name + " " + element.section}
                </a>
              </div>
              <span className="font-bold text-xl mr-4">
                {class_name} {element.section}
              </span>
              <span className="text-xl text-gray-700">{element.title}</span>
            </div>
            <div className="flex gap-1 my-4">
              <SectionsRating section={element} />
              <span className="font-bold rounded-full flex items-center justify-center text-gray-600">
                {element.workloadRatingNum} Ratings:
              </span>
              {ratingToDiv(element.course.qualityRating, "Quality:")}
              {ratingToDiv(element.professorRating, "Professor:")}
              {ratingToDiv(element.workloadRating, "Workload:")}
              {ratingToDiv(element.course.difficultyRating, "Difficulty:")}
            </div>
            <div className="mb-5 w-full mt-3">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Description
              </p>
              <p className="text-gray-700">{element.course.description}</p>
            </div>
            <div className="mb-5 w-full">
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
            <div className="mb-5 w-full">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Section details
              </p>
              <ul>
                <li>Professor: {formatProfessor(element.professor.name)}</li>
                <li>Days: {formatDaysLong(element.days)}</li>
                <li>
                  Time: {formatTime(element.start)}-{formatTime(element.end)}
                </li>
                <li>Type: {element.type}</li>
                <li>Room: {element.room || "To be decided"}</li>
              </ul>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-gray-700 font-bold w-full border-b border-gray-300">
                Other
              </p>
              <a
                className="px-4 py-1 mr-3 font-bold text-gray-500 bg-gray-200 focus:outline-none rounded-sm border-b-2 border-r-2 border-gray-400 hover:bg-gray-300 cursor-pointer"
                href={
                  "/coursesearch/courses?course=" +
                  class_name.replaceAll(" ", "")
                }
              >
                See other sections of this course
              </a>
              <a
                className="px-4 py-1 mr-3 font-bold text-gray-500 bg-gray-200 focus:outline-none rounded-sm border-b-2 border-r-2 border-gray-400 hover:bg-gray-300 cursor-pointer"
                href={
                  "/coursesearch/professors?professor=" + element.professor.name
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
