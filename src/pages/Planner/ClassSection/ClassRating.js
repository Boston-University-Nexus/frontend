import React from "react";

// Rating number in class/recommended section

function getColor(val, type) {
  // Decides the color based on the rating
  if (val < 1) return "bg-gray-200";

  if (type === "Quality") {
    if (val < 5 / 3) return "bg-red-300";
    else if (val < 10 / 3) return "bg-yellow-200";
    else return "bg-green-300";
  } else {
    if (val < 5 / 3) return "bg-green-300";
    else if (val < 10 / 3) return "bg-yellow-200";
    else return "bg-red-300";
  }
}

export default function ClassRating(props) {
  return (
    <div
      className={
        "px-3 py-1 rounded-full w-1/3 h-8 flex items-center justify-center text-sm " +
        getColor(props.val, props.ratingType)
      }
    >
      <span className="font-bold">{props.val < 0 ? "--" : props.val}</span>
    </div>
  );
}
