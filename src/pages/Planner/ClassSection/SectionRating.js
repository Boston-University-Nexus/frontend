import React from "react";

// Rating number in class/recommended section

function getColor(val, type) {
  // Decides the color based on the rating
  if (val < 1) return "bg-gray-200";

  if (type === "Professor") {
    if (val < 5 / 3) return "bg-red-300";
    else if (val < 10 / 3) return "bg-yellow-200";
    else return "bg-green-300";
  } else {
    if (val < 5 / 3) return "bg-green-300";
    else if (val < 10 / 3) return "bg-yellow-200";
    else return "bg-red-300";
  }
}

export default function SectionRating(props) {
  return (
    <div
      className={
        "px-2 rounded-full w-1/4 h-6 flex items-center justify-center text-xs " +
        getColor(props.val, props.ratingType)
      }
    >
      <span className="font-bold">{props.val < 0 ? "--" : props.val}</span>
    </div>
  );
}
