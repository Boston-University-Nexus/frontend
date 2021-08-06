import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";

export default class SearchBar extends Component {
  render() {
    return (
      <div
        className="p-6"
        className="w-full border border-gray-300 rounded-sm flex h-12 focus-within:border-blue-300"
      >
        <input
          type="search"
          className="w-full focus:outline-none h-full px-4 uppercase"
          placeholder="Search for a professor, course, section..."
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) =>
            (e.target.placeholder =
              "Search for a professor, course, section...")
          }
          onChange={this.props.search}
        />
        <button
          type="submit"
          className="px-4 bg-blue-100 border-l border-gray-300 text-gray-500"
        >
          <FaSearch />
        </button>
      </div>
    );
  }
}
