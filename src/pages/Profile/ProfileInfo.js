import React from "react";
import { FiEdit2 } from "react-icons/fi";

export default function ProfileInfo(props) {
  return (
    <div
      className={
        "flex items-center justify-between w-full border-b border-gray-200 py-2 " +
        props.addedStyles
      }
    >
      <p className="text-black">{props.title}</p>
      <div
        className={
          "text-gray-500 flex items-center " +
          (props.edit ? "hover:text-black cursor-pointer" : "")
        }
        onClick={() => {
          if (props.edit) props.edit(props.title, props.value);
        }}
      >
        {props.value}
        {props.edit && <FiEdit2 className="ml-2" />}
      </div>
    </div>
  );
}
