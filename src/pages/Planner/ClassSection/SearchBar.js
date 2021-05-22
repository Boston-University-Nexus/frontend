import React, { Component } from "react";

import { FaFilter } from "react-icons/fa";
import { ImSortAmountDesc } from "react-icons/im";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="flex items-center border-b border-gray-300 pr-2 w-full py-5">
        <input
          type="text"
          placeholder="SEARCH..."
          // -- These remove the placeholder when about to type --
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "SEARCH...")}
          // ------------------------------------------------------
          onChange={this.props.handleType}
          className="w-10/12 text-xl h-full pl-4 text-gray-700 focus:outline-none focus:border focus:border-solid focus:border-blue-500"
        />
        <button className="h-full w-1/12 flex items-center justify-center">
          <ImSortAmountDesc className="text-xl" />
        </button>
        <button className="h-full w-1/12 flex items-center justify-center">
          <FaFilter className="text-xl" />
        </button>
      </div>
    );
  }
}
