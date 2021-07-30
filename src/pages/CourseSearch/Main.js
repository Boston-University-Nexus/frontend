import React, { Component } from "react";
import SearchBar from "./SearchBar";
import config from "../../config";
import {
  checkTypedType,
  formatDays,
  formatPrereqs,
  formatProfessor,
  formatRating,
  formatTime,
} from "./Utils";
import axios from "axios";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.makeRequest = this.makeRequest.bind(this);
    this.searchAction = this.searchAction.bind(this);

    this.state = {
      data_type: "",
      data: [],
      finished_loading: true,
    };
  }

  //   Makes a request to the server at url "url"
  async makeRequest(url) {
    let res = await axios.get(url);
    let data = res.data;

    if (data.length === 0) return false;
    else return data;
  }

  async searchAction(e) {
    // So we dont render info we dont have
    this.setState({ finished_loading: false });

    let result = checkTypedType(e.target.value);
    let query_terms = result[1];
    let search_for = result[0];

    if (search_for.length === 0) {
      this.setState({ data: [], data_type: "", finished_loading: true });
      return;
    }

    let url = config["server"];

    // For every query option we have
    for (const search_item of search_for) {
      let search_url = url + search_item + "?";

      // Create the search url
      if (search_item != "professors")
        for (const query in query_terms) {
          if (query != "professor")
            search_url += query + "=" + query_terms[query] + "&";
        }
      else search_url += "professor_name_contains=" + query_terms["professor"];

      // Make request and check if there are any results
      var valid = await this.makeRequest(search_url);
      if (valid) {
        this.setState({ data_type: search_item });
        break;
      }
    }

    if (valid && valid.length > 0) {
      this.setState({ data: valid.slice(0, 10) });
    } else {
      this.setState({ data: [], data_type: "not_found" });
    }

    this.setState({ finished_loading: true });
  }

  render() {
    return (
      <div
        className="w-full md:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white h-full shadow-2xl px-7"
        style={{ paddingTop: 72 }}
      >
        <h1 className="font-bold text-xl mt-3">
          Welcome to our Reviews & Info section
        </h1>
        <h2 className="text-gray-700 mt-3 mb-8">
          Here you can easily search for all the information relevant to Boston
          University students about classes, professors, sections, etc. Start by
          searching something in the search bar below!
        </h2>
        <SearchBar searchAction={this.searchAction} />
        <table className="w-full mt-4 table-fixed">
          {this.state.finished_loading &&
            this.state.data.length > 0 &&
            (this.state.data_type == "courses" ? (
              <tr className="h-12 w-full bg-blue-100">
                <th className="px-3 w-1/6 text-left">Course</th>
                <th className="px-3 w-2/6 text-left">Title</th>
                <th className="px-3 w-1/6 text-left">Prereqs</th>
                <th className="px-3 w-1/6">Quality</th>
                <th className="px-3 w-1/6">Difficulty</th>
              </tr>
            ) : this.state.data_type == "sections" ? (
              <tr className="h-12 w-full text-left bg-blue-100">
                <th className="px-3 w-3/12 text-left">Course</th>
                <th className="px-3 w-2/12 text-left">Type</th>
                <th className="px-3 w-2/12 text-left">Days</th>
                <th className="px-3 w-3/12 text-left">Time</th>
                <th className="px-3 w-2/12 text-left">Professor</th>
              </tr>
            ) : (
              <tr className="h-12 w-full bg-blue-100">
                <th className="px-3 text-left">Name</th>
                <th className="px-3">Rating</th>
              </tr>
            ))}
          {this.state.finished_loading &&
            this.state.data.length > 0 &&
            this.state.data.map((element) => {
              let data_type = this.state.data_type;

              if (data_type === "courses") {
                let loc = "/coursesearch/courses?course=" + element.course_code;

                return (
                  <tr className="h-12 w-full text-gray-700 bg-indigo-50">
                    <td
                      className="px-3 hover:text-blue-500 cursor-pointer"
                      onClick={() => (window.location = loc)}
                    >
                      {element.course_code}
                    </td>
                    <td
                      className="px-3 overflow-ellipsis overflow-hidden whitespace-nowrap hover:text-blue-500 cursor-pointer"
                      onClick={() => (window.location = loc)}
                    >
                      {element.course_title || "-"}
                    </td>
                    <td className="px-3">
                      {formatPrereqs(element.course_prereqs)}
                    </td>
                    <td
                      className="px-3"
                      onClick={() => (window.location = loc)}
                    >
                      {formatRating(element.course_qualityRating)}
                    </td>
                    <td
                      className="px-3"
                      onClick={() => (window.location = loc)}
                    >
                      {formatRating(element.course_difficultyRating)}
                    </td>
                  </tr>
                );
              } else if (data_type === "sections") {
                let loc =
                  "/coursesearch/sections?section=" +
                  element.course_code +
                  element.section_code;

                return (
                  <tr className="h-12 w-full text-gray-700 bg-indigo-50">
                    <td
                      className="px-3 hover:text-blue-500 cursor-pointer"
                      onClick={() => (window.location = loc)}
                    >
                      {element.course_code} {element.section_code}
                    </td>
                    <td className="px-3">{element.section_type || "-"}</td>
                    <td className="px-3">{formatDays(element.section_days)}</td>
                    <td className="px-3">
                      {formatTime(element.section_start)}-
                      {formatTime(element.section_end)}
                    </td>
                    <td className="px-3 w-1/5 overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {formatProfessor(element.professor_name)}
                    </td>
                  </tr>
                );
              } else if (data_type === "professors") {
                let loc =
                  "/coursesearch/professors?professor=" +
                  element.professor_name;

                return (
                  <tr className="h-12 w-full text-gray-700 bg-indigo-50">
                    <td
                      className="px-3 cursor-pointer hover:text-blue-500"
                      onClick={() => (window.location = loc)}
                    >
                      {element.professor_name}
                    </td>
                    <td className="px-3">
                      {formatRating(element.professor_rating)}
                    </td>
                  </tr>
                );
              }
            })}
        </table>
        {!this.state.finished_loading && this.state.data.length > 0 && (
          <div className="w-full flex items-center justify-center">
            <div id="loading_spinner"></div>
          </div>
        )}
        {this.state.finished_loading &&
          this.state.data.length == 0 &&
          this.state.data_type === "not_found" && (
            <div>No results found matching query, try something different!</div>
          )}
      </div>
    );
  }
}
