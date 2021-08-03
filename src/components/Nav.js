import React, { Component } from "react";

import { NavLink, Link } from "react-router-dom";

// Icons
import { FiUser } from "react-icons/fi";
import { connect } from "react-redux";

class PlannerNav extends Component {
  render() {
    return (
      <div className="w-full py-2 justify-center items-center bg-white shadow-xl z-50">
        <div className="w-full px-4 flex justify-between items-center">
          <div className="font-bold text-xl">
            <a href="/">BUNexus</a>
          </div>
          <div className="flex items-center justify-end w-1/2">
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
            <div className="group relative">
              <div className="p-2 flex items-center justify-center bg-gray-200 rounded-full ml-5">
                <FiUser className="w-6 h-6" />
              </div>
              <div className="group-hover:opacity-100 opacity-0 absolute bg-white flex flex-col justify-center items-center shadow-xl border-2 border-gray-200 right-0 w-60">
                {!this.props.stateLoggedIn && (
                  <>
                    <a
                      href={process.env.REACT_APP_SERVER + "login"}
                      className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                    >
                      Login
                    </a>
                    <a
                      href={process.env.REACT_APP_SERVER + "login/test"}
                      className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                    >
                      Login Test
                    </a>
                  </>
                )}
                {this.props.stateLoggedIn && (
                  <>
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                    >
                      Settings
                    </Link>
                    <a
                      href={process.env.REACT_APP_SERVER + "logout"}
                      className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                    >
                      Logout
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateLoggedIn: state.users.stateLoggedIn,
  };
};

export default connect(mapStateToProps)(PlannerNav);
