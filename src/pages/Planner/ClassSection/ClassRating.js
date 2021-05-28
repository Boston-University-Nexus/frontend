import React from "react";

// Rating number in class/recommended section

function getColor(val, type) {
  // Decides the color based on the rating
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
    <div className="flex items-center justify-center w-1/5 text-sm">
      <div
        className={"px-3 py-1 rounded-full " + getColor(props.val, props.ratingType)}
      >
        <span className="font-bold">{props.val}</span>
      </div>
    </div>
  );
}
