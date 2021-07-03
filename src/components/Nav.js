import React, { Component } from "react";

import { NavLink, Link } from "react-router-dom";

export default class PlannerNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }
  render() {
    return (
      <div className="w-full py-2 flex justify-center items-center bg-white shadow-xl absolute">
        <div className="w-full px-4 flex justify-between items-center">
          <div className="font-bold text-xl">
            <a href="/">BUNexus</a>
          </div>
          <div className="flex items-center">
            <NavLink
              exact
              to="/planner"
              activeClassName="font-bold"
              className="uppercase hover:underline mx-2"
            >
              Planner
            </NavLink>
            <NavLink
              to="/coursesearch"
              activeClassName="font-bold"
              className="uppercase hover:underline mx-2"
            >
              Reviews & Info
            </NavLink>
            <NavLink
              to="/about"
              activeClassName="font-bold"
              className="uppercase hover:underline mx-2"
            >
              About
            </NavLink>
            <div
              className="relative"
              onMouseEnter={() => this.setState({ menuOpen: true })}
              onMouseLeave={() => this.setState({ menuOpen: false })}
            >
              <div className="w-10 h-10 bg-green-500 rounded-full ml-5"></div>
              {this.state.menuOpen && (
                <div className="absolute flex flex-col bg-white shadow-xl rounded border border-gray-300 right-0">
                  <Link
                    to="/planner/login"
                    className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/planner/profile"
                    className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/planner/settings"
                    className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                  >
                    Settings
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}