import React from "react";

function getColor(val, type) {
  if (type === "Quality") {
    if (val < 5 / 3) return "bg-red-300";
    else if (val < 10 / 3) return "bg-yellow-300";
    else return "bg-green-300";
  } else {
    if (val < 5 / 3) return "bg-green-300";
    else if (val < 10 / 3) return "bg-yellow-300";
    else return "bg-red-300";
  }
}

export default function ClassRating(props) {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={"px-4 rounded-full " + getColor(props.val, props.ratingType)}
      >
        <span>{props.val}</span>
      </div>
    </div>
  );
}
