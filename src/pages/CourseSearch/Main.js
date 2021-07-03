import React, { Component } from "react";
import SearchBar from "./SearchBar";

const checkTypedType = (text) => {
  text = text.replace(/\s/g, "").toLowerCase();
  let len = text.length;

  // REGEX EXPRESSIONS
  let full_section_expr = new RegExp(/\b[a-z]{5}[0-9]{3}[a-z]/);
  let full_course_expr = new RegExp(/\b[a-z]{5}[0-9]+/);

  let half_course_expr = new RegExp(/[a-z]{2}/);
  let half_section_expr = new RegExp(/[a-z]{2}[0-9]{3}[a-z]/);

  let college_expr = new RegExp(/[a-z]{3}/);
  let prof_expr = new RegExp(/[a-z]*/);

  let query_terms = {};

  // CHECKS FOR AAABB0
  if (full_course_expr.test(text) && len <= 8) {
    query_terms["college"] = text.substring(0, 3);
    query_terms["department"] = text.substring(3, 5);
    query_terms["number"] = text.substring(5, 8);
    return [["course"], query_terms];
  }
  // CHECKS FOR AAABB000A
  else if (full_section_expr.test(text) && len <= 10) {
    query_terms["college"] = text.substring(0, 3);
    query_terms["department"] = text.substring(3, 5);
    query_terms["number"] = text.substring(5, 8);
    query_terms["number"] = text.substring(5, 8);
    return [["section"], query_terms];
  }
  // CHECKS FOR BB0
  else if (half_course_expr.test(text) && len <= 5) {
    return [["course"], query_terms];
  }
  // CHECKS FOR BB000A
  else if (half_section_expr.test(text) && len <= 7) {
    return [["section"], query_terms];
  }
  // CHECKS FOR AAB OR AA0
  else if (college_expr.test(text) && len <= 6) {
    return [["course", "professor"], query_terms];
    // CHECKS FOR ONLY LETTERS
  } else if (prof_expr.test(text)) {
    return [["professor"], query_terms];
  } else {
    return [];
  }

  // Test for CAS,CS,CASCS,CAS112,CS112,CASCS112,CS112A1,CASCS112A1,James,James Smith,James Smith-Ortega
};

export default class Main extends Component {
  //   Makes a request to the server of type "req_type" with
  //   query "query"
  makeRequest(req_type, query) {}

  searchAction(e) {
    console.log(
      e.target.value.replace(/\s/g, "") + " - " + checkTypedType(e.target.value)
    );
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
      </div>
    );
  }
}
