import React from "react";

function getColor(val, type) {
  // Decides the color based on the rating
  if (type === "quality" || type === "instructor") {
    if (val < 5 / 3) return "bg-red-200";
    else if (val < 10 / 3) return "bg-yellow-200";
    else return "bg-green-200";
  } else {
    if (val < 5 / 3) return "bg-green-200";
    else if (val < 10 / 3) return "bg-yellow-200";
    else return "bg-red-200";
  }
}

export default function ScheduleRating(props) {
  return (
    <div className="flex items-center justify-center text-xs ml-2">
      <div className={"px-3 rounded-full " + getColor(props.val, props.type)}>
        <span>{props.val}</span>
      </div>
    </div>
  );
}
