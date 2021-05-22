import React from "react";

export default function ClassRating(props) {
  return (
    <div className="flex items-center justifyc-center mr-3">
      <div className="px-2 bg-green-300 rounded mr-1">
        <span>{props.val}</span>
      </div>
      <span className="text-gray-500">{props.text}</span>
    </div>
  );
}
