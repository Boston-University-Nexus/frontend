import React from "react";
import { Component } from "react";

import { FiCheck, FiX } from "react-icons/fi";

export default class Cookies extends Component {
  state = {
    value: null,
  };

  componentDidUpdate() {
    if (localStorage.getItem("bunexus_acceptedCookies") !== this.state.value) {
      this.setState({ value: localStorage.getItem("bunexus_acceptedCookies") });
    }
  }

  updateCookies(val) {
    localStorage.setItem("bunexus_acceptedCookies", val);
    this.setState({ value: localStorage.getItem("bunexus_acceptedCookies") });
  }

  render() {
    if (this.state.value === null)
      return (
        <div
          className="fixed left-0 bottom-0 bg-white bg-opacity-90 w-full p-5 flex items-center justify-center gap-3"
          style={{ zIndex: 500 }}
        >
          <p style={{ maxWidth: "90%" }}>
            We use necessary cookies to keep you logged in to the site. We would
            also like to use optional cookies to track your usage.
          </p>
          <button
            className="border rounded-md py-2 px-3 border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:scale-105 transform transition-colors transition-transform focus:outline-none"
            onClick={() => this.updateCookies(true)}
          >
            <FiCheck />
          </button>
          <button
            className="border rounded-md py-2 px-3 border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:scale-105 transform transition-colors transition-transform focus:outline-none"
            onClick={() => this.updateCookies(false)}
          >
            <FiX />
          </button>
        </div>
      );
    return <></>;
  }
}
