import React, { Component } from "react";
import config from "../config";
import { NavLink, Link } from "react-router-dom";

// Icons
import { FiUser } from "react-icons/fi";

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
              <div className="p-2 flex items-center justify-center bg-gray-200 rounded-full ml-5">
                <FiUser className="w-6 h-6" />
              </div>
              {this.state.menuOpen && (
                <div className="absolute flex flex-col bg-white shadow-xl rounded border border-gray-300 right-0">
                  <a
                    href={config["server"] + "login"}
                    className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                  >
                    Login
                  </a>
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
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
