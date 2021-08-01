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

// Icons
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.makeRequest = this.makeRequest.bind(this);
    this.searchAction = this.searchAction.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.loadPrevPage = this.loadPrevPage.bind(this);

    this.state = {
      data_type: "",
      data: [],
      finished_loading: true,
      page: 0,
      sql_page: 0,
    };
  }

  // Generate page buttons
  pageButtons(num, selected, sql_page) {
    let arr = [];
    for (let i = 0; i < num; i++)
      if (i == selected)
        arr.push(
          <div className="h-10 px-3 bg-blue-300 cursor-not-allowed select-none flex items-center">
            {i + sql_page * 5 + 1}
          </div>
        );
      else
        arr.push(
          <div
            className="h-10 px-3 bg-blue-100 cursor-pointer select-none flex items-center"
            onClick={() => this.setState({ page: i })}
          >
            {i + sql_page * 5 + 1}
          </div>
        );

    return arr;
  }

  // Query for next page
  async loadNextPage() {
    const result = await this.makeRequest(
      this.state.prev_query + "page=" + (this.state.sql_page + 1)
    );

    if (result)
      this.setState({
        sql_page: this.state.sql_page + 1,
        page: 0,
        data: result,
        pages: Math.ceil(result.length / config["coursesearch_max_items"]),
      });
  }

  // Query for next page
  async loadPrevPage() {
    const result = await this.makeRequest(
      this.state.prev_query + "page=" + (this.state.sql_page - 1)
    );

    if (result)
      this.setState({
        sql_page: this.state.sql_page - 1,
        page: 0,
        data: result,
        pages: Math.ceil(result.length / config["coursesearch_max_items"]),
      });
  }

  // Makes a request to the server at url "url"
  async makeRequest(url) {
    let data = [];

    await axios
      .get(url)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        data = [];
      });

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
      this.setState({
        data: [],
        data_type: "",
        finished_loading: true,
        sql_page: 0,
        page: 0,
        pages: 0,
      });
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
      else
        search_url +=
          "professor_name_contains=" + query_terms["professor"] + "&";

      // Make request and check if there are any results
      var valid = await this.makeRequest(search_url);
      if (valid) {
        this.setState({ data_type: search_item, prev_query: search_url });
        break;
      }
    }

    if (valid && valid.length > 0) {
      this.setState({
        data: valid,
        page: 0,
        pages: Math.ceil(valid.length / config["coursesearch_max_items"]),
        sql_page: 0,
      });
    } else {
      this.setState({ data: [], data_type: "not_found" });
    }

    this.setState({ finished_loading: true });
  }

  render() {
    return (
      <div
        className="w-full h-screen md:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white h-full shadow-2xl px-7"
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
          <thead>
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
          </thead>
          <tbody>
            {this.state.finished_loading &&
              this.state.data.length > 0 &&
              this.state.data.map((element, idx) => {
                let data_type = this.state.data_type;
                let page = this.state.page * config["coursesearch_max_items"];

                // If the idx is in the page we are in
                if (
                  page <= idx &&
                  idx < page + config["coursesearch_max_items"]
                )
                  if (data_type === "courses") {
                    let loc =
                      "/coursesearch/courses?course=" + element.course_code;

                    return (
                      <tr
                        className="h-12 w-full text-gray-700 bg-indigo-50"
                        key={idx}
                      >
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
                        <td className="px-3 overflow-hidden overflow-ellipsis">
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
                      <tr
                        className="h-12 w-full text-gray-700 bg-indigo-50"
                        key={idx}
                      >
                        <td
                          className="px-3 hover:text-blue-500 cursor-pointer"
                          onClick={() => (window.location = loc)}
                        >
                          {element.course_code} {element.section_code}
                        </td>
                        <td className="px-3">{element.section_type || "-"}</td>
                        <td className="px-3">
                          {formatDays(element.section_days)}
                        </td>
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
                      <tr
                        className="h-12 w-full text-gray-700 bg-indigo-50"
                        key={idx}
                      >
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
          </tbody>
        </table>

        {/* Page buttons */}
        <div className="flex items-center mt-2 gap-2">
          {/* Go back pages button */}
          {this.state.finished_loading && this.state.sql_page != 0 && (
            <div
              className="h-10 px-2 bg-blue-100 cursor-pointer select-none flex items-center"
              onClick={this.loadPrevPage}
            >
              <FiChevronLeft />
            </div>
          )}

          {/* Switch pages button */}
          {this.state.finished_loading &&
            this.state.pages > 1 &&
            this.pageButtons(
              this.state.pages,
              this.state.page,
              this.state.sql_page
            )}

          {/* Go more pages button */}
          {this.state.finished_loading &&
            this.state.data.length == config["sql_max_items"] && (
              <div
                className="h-10 px-2 bg-blue-100 cursor-pointer select-none flex items-center"
                onClick={this.loadNextPage}
              >
                <FiChevronRight />
              </div>
            )}
        </div>
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
