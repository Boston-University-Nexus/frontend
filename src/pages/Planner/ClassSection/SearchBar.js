import React, { Component } from "react";

// Icons
import { FaFilter } from "react-icons/fa";
import { ImSortAmountDesc } from "react-icons/im";

export default class SearchBar extends Component {
  render() {
    return (
      <div
        className="flex items-center pr-4 w-full bg-blue-100 transition-none"
      >
        <input
          type="text"
          placeholder="SEARCH..."
          onChange={this.props.handleType}
          className="w-10/12 h-full text-base xl:text-xl pl-4 py-4 focus:outline-none focus:border focus:border-solid focus:border-blue-500 bg-blue-100 placeholder-gray-600"
        />

        {/* Order button */}
        <button className="h-full w-1/12 flex items-center justify-center mx-2 text-gray-600">
          <ImSortAmountDesc className="text-xl" />
        </button>

        {/* Filter button */}
        <button className="h-full w-1/12 flex items-center justify-center text-gray-600">
          <FaFilter className="text-xl" />
        </button>
      </div>
    );
  }
}
