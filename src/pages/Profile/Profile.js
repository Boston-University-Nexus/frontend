import React, { useState } from "react";
import { connect } from "react-redux";
import ProfileInfo from "./ProfileInfo";

// Icons
import { IoCloseOutline } from "react-icons/io5";
import { FiCheck } from "react-icons/fi";

function Profile(props) {
  const [popupOpened, openPopup] = useState({
    opened: false,
    title: "",
  });

  const [fieldEdit, saveField] = useState("");

  const edit = (type, val) => {
    openPopup({ opened: true, title: type });
    saveField(val);
  };

  return (
    <div className="w-full h-screen bg-blue-300 flex justify-center page">
      <div className="flex flex-col items-center w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white h-full shadow-xl p-10">
        <h1 className="w-full font-bold text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-6">
          Your profile
        </h1>
        <div className="w-full">
          <h2 className="mb-2 font-bold text-lg text-gray-800">
            Your information
          </h2>
          <ProfileInfo
            title="Full Name"
            value={props.stateUser.user_displayName}
            addedStyles="capitalize"
          />
          <ProfileInfo
            title="Email"
            value={props.stateUser.user_email}
            addedStyles=""
          />
          <ProfileInfo
            title="BU ID"
            value={props.stateUser.user_buID}
            addedStyles="uppercase"
          />
          <ProfileInfo
            title="Major"
            value={props.stateUser.major_name}
            addedStyles="capitalize"
            edit={edit}
          />
          <ProfileInfo
            title="Year"
            value={props.stateUser.user_year}
            addedStyles="capitalize"
            edit={edit}
          />

          <h2 className="mb-2 mt-6 font-bold text-lg text-gray-800">
            Your schedules
          </h2>
          <div className="">
            <p>Nexus Recommended</p>
            <p>Prioritize Major</p>
            <p>Prioritize Hubs</p>
            <p>Schedule 1</p>
          </div>
        </div>
        <div className="opacity-0 bg-red-500 w-full" id="bunexus_extensionKey">
          {props.stateUser.user_key || "no key"}
        </div>
      </div>
      {popupOpened.opened && (
        <div
          className="w-screen h-screen flex fixed top-0 left-0 bg-black bg-opacity-80 items-center justify-center"
          style={{ zIndex: 1000 }}
          onClick={() => openPopup(false)}
        >
          <div
            className="bg-white w-2/3 lg:w-1/2 p-5 rounded-md shadow-2xl relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-start justify-between">
              <h1 className="font-bold text-xl mb-2">
                Editing your {popupOpened.title.toLowerCase()}
              </h1>
              <IoCloseOutline
                className="text-xl cursor-pointer"
                onClick={() => openPopup(false)}
              />
            </div>
            <form
              className="w-full flex items-center h-10 focus-within:border-green-200 border-gray-200 border border-gray-200 rounded-sm"
              action={process.env.REACT_APP_SERVER + "user/edit"}
              method="POST"
            >
              <input
                type="text"
                name={popupOpened.title.toLowerCase()}
                value={fieldEdit}
                className="w-full h-full px-3 focus:outline-none"
                onChange={(e) => saveField(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-200 h-full w-10 flex items-center justify-center focus:bg-green-500 focus:outline-none"
              >
                <FiCheck />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateExtensionKey: state.users.stateExtensionKey,
    stateUser: state.users.stateUser,
  };
};

export default connect(mapStateToProps)(Profile);
