import React from "react";
// Icons
import { IoCloseOutline } from "react-icons/io5";

export default function NeedLogin(props) {
  return (
    <div className="bg-white p-5 rounded-md shadow-2xl relative">
      <div className="flex items-start justify-between">
        <h1 className="font-bold text-xl mb-2">Whoops!</h1>
        <IoCloseOutline
          className="text-xl cursor-pointer"
          onClick={() => props.close("needLogin")}
        />
      </div>
      <p className="leading-relaxed">
        You need to{" "}
        <a
          href={process.env.REACT_APP_SERVER + "login"}
          className="text-blue-500 hover:underline"
        >
          log in
        </a>{" "}
        to be able to use our app.
      </p>
    </div>
  );
}
