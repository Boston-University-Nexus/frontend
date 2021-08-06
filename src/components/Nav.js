import React, { useState } from "react";

import { NavLink, Link } from "react-router-dom";

// Icons
import { FiMenu, FiUser } from "react-icons/fi";
import { connect } from "react-redux";

function PlannerNav(props) {
  const [dropdownOpened, setOpen] = useState(false);
  const [mobileOpened, setMobileOpen] = useState(false);

  return (
    <div
      className="absolute w-full top-0 left-0 px-2 sm:px-4 flex justify-between items-center bg-white shadow-xl z-50"
      style={{ height: "56px" }}
    >
      <div className="font-bold text-xl">
        <a href="/">BUNexus</a>
      </div>
      <div className="flex items-center justify-end w-1/2">
        <NavLink
          exact
          to="/planner"
          className="uppercase hover:underline mx-2 text-gray-600 sm:block hidden"
          activeStyle={{
            color: "black",
            fontWeight: "500",
          }}
        >
          Planner
        </NavLink>
        <NavLink
          to="/coursesearch"
          className="uppercase hover:underline mx-2 text-gray-600 sm:block hidden"
          activeStyle={{
            color: "black",
            fontWeight: "500",
          }}
        >
          Reviews & Info
        </NavLink>
        <NavLink
          to="/about"
          className="uppercase hover:underline mx-2 text-gray-600 sm:block hidden"
          activeStyle={{
            color: "black",
            fontWeight: "500",
          }}
        >
          About
        </NavLink>
        <div
          className="relative"
          onMouseEnter={() => {
            if (window.innerWidth >= 640) setOpen(true);
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 640) setOpen(false);
          }}
        >
          <div className="p-2 flex items-center justify-center bg-gray-200 rounded-full ml-5">
            <FiUser
              className="w-6 h-6"
              onClick={() => {
                if (window.innerWidth < 640) {
                  setOpen(true);
                  setMobileOpen(false);
                }
              }}
            />
          </div>
          {dropdownOpened && (
            <>
              <div
                className="sm:hidden w-screen h-screen fixed top-0 left-0"
                style={{ zIndex: 500 }}
                onClick={() => setOpen(false)}
              ></div>
              <div
                className="absolute bg-white flex-col justify-center items-center shadow-xl border-2 border-gray-200 right-0"
                style={{ zIndex: 500 }}
              >
                {!props.stateLoggedIn && (
                  <div className="flex flex-col w-32">
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
                  </div>
                )}
                {props.stateLoggedIn && (
                  <div className="flex flex-col w-52">
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
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="relative sm:hidden">
          <div
            className="p-1 flex items-center justify-center rounded-full ml-1"
            onClick={() => {
              setMobileOpen(true);
              setOpen(false);
            }}
          >
            <FiMenu className="w-7 h-7" />
          </div>
          {mobileOpened && (
            <>
              <div
                className="w-screen h-screen fixed top-0 left-0"
                style={{ zIndex: 500 }}
                onClick={() => setMobileOpen(false)}
              ></div>
              <div
                className="absolute top-full right-0 bg-white shadow-2xl rounded-sm flex flex-col border-2 border-gray-200 w-52 mt-2"
                style={{ zIndex: 500 }}
              >
                <Link
                  to="/planner"
                  className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Planner
                </Link>
                <Link
                  to="/coursesearch"
                  className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Reviews & Info
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 hover:bg-gray-200 hover:text-blue-500 bg-white w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  About
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateLoggedIn: state.users.stateLoggedIn,
  };
};

export default connect(mapStateToProps)(PlannerNav);
