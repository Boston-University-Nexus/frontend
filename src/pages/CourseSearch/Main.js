import React, { Component, useCallback, useState } from "react";
import { request } from "../../middlewares/requests";
import SearchBar from "./SearchBar";

import {
  checkTypedType,
  formatDays,
  formatPrereqs,
  formatProfessor,
  formatRating,
  formatTime,
} from "./Utils";

// Icons
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { connect } from "react-redux";
import { stateSetPopups } from "../../state/actions";
import debounce from "lodash.debounce";

function Main(props) {
  const [page, setPage] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const [data, setData] = useState(0);
  const [type, setType] = useState(0);

  // Generate page buttons
  const pageButtons = () => {
    let arr = [];
    for (let i = page - 1; i < page + 7; i++)
      if (i === page)
        arr.push(
          <div
            className="h-10 w-10 bg-blue-300 cursor-not-allowed select-none flex items-center justify-center"
            key={i}
          >
            {i + 1}
          </div>
        );
      else if (i <= numPages && i !== -1)
        arr.push(
          <div
            className="h-10 w-10 bg-blue-100 cursor-pointer select-none flex items-center justify-center"
            onClick={() => setPage(i)}
            key={i}
          >
            {i + 1}
          </div>
        );

    return arr;
  };

  // Debounces the function call with params query
  const debounceQuery = useCallback(
    debounce((query, call) => {
      call(query);
    }, 400),
    []
  );

  // Makes a request to the.REACT_APP_SERVER at url "url"
  const makeRequest = async (url) => {
    let data = [];

    await request.get(url).then((res) => {
      if (res && !res.error) data = res.data;
      else if (!res) data = [];
      else
        props.stateSetPopups({
          ...props.statePopups,
          rateLimit: true,
        });
    });

    if (data.length === 0) return false;
    else return data;
  };

  const onSearch = (e) => {
    debounceQuery(e, searchAction);
  };

  const searchAction = async (e) => {
    // So we dont render info we dont have
    let result = checkTypedType(e.target.value);
    let query_terms = result[1];
    let search_for = result[0];
    let url = process.env.REACT_APP_SERVER;

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
      var valid = await makeRequest(search_url);
      if (valid) {
        setType(search_item);
        break;
      }
    }

    if (valid && valid.length > 0) {
      setData(valid);
      setNumPages(Math.floor(valid.length / 8));
    } else {
      setData([]);
      setNumPages(0);
    }
  };

  return (
    <div className="w-full h-full md:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white h-full shadow-2xl p-7">
      <h1 className="font-bold text-xl mt-3">
        Welcome to our Reviews & Info section
      </h1>
      <h2 className="text-gray-700 mt-3 mb-8">
        Here you can easily search for all the information relevant to Boston
        University students about classes, professors, sections, etc. Start by
        searching something in the search bar below!
      </h2>
      <SearchBar searchAction={onSearch} />
      <table className="w-full mt-4 table-fixed">
        <thead>
          {data.length > 0 &&
            (type == "courses" ? (
              <tr className="h-12 w-full bg-blue-100">
                <th className="px-3 w-1/6 text-left">Course</th>
                <th className="px-3 w-2/6 text-left">Title</th>
                <th className="px-3 w-1/6 text-left">Prereqs</th>
                <th className="px-3 w-1/6">Quality</th>
                <th className="px-3 w-1/6">Difficulty</th>
              </tr>
            ) : type == "sections" ? (
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
          {data.length > 0 &&
            data.map((element, idx) => {
              let pageNow = page * 8;

              // If the idx is in the page we are in
              if (idx >= pageNow && idx < pageNow + 8)
                if (type === "courses") {
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
                } else if (type === "sections") {
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
                } else if (type === "professors") {
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
        {page > 0 && (
          <div
            className="h-10 w-10 bg-blue-100 cursor-pointer select-none flex items-center justify-center"
            onClick={() => setPage(page - 1)}
          >
            <FiChevronLeft />
          </div>
        )}
        {numPages > 1 && pageButtons()}
        {page < numPages && (
          <div
            className="h-10 w-10 bg-blue-100 cursor-pointer select-none flex items-center justify-center"
            onClick={() => setPage(page + 1)}
          >
            <FiChevronRight />
          </div>
        )}
      </div>
      {false && data.length > 0 && (
        <div className="w-full flex items-center justify-center">
          <div id="loading_spinner"></div>
        </div>
      )}
      {data.length == 0 && type === "not_found" && (
        <div>No results found matching query, try something different!</div>
      )}
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    statePopups: state.events.statePopups,
    stateLoggedIn: state.users.stateLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSetPopups: (popups) => dispatch(stateSetPopups(popups)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
