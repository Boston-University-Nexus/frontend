import React from "react";

// Rating number in class/recommended section

function getColor(val, type) {
  // Decides the color based on the rating
  let color = "bg-gray-200";
  if (val === 0)
    return (
      <div
        className={
          "text-sm lg:text-base flex items-center justify-center rounded-sm px-1 " +
          color
        }
      >
        TBD
      </div>
    );

  if (type === "Quality") {
    if (val < 2.33) {
      color = "bg-red-300";
    } else if (val < 3.66) {
      color = "bg-yellow-200";
    } else {
      color = "bg-green-300";
    }
    val = parseInt(val) + "/5";
  } else {
    if (val < 2.33) val = "LOW";
    else if (val < 3.66) val = "MEDI";
    else val = "HIGH";
  }

  return (
    <div
      className={
        "text-sm lg:text-base flex items-center justify-center rounded-sm px-1 " +
        color
      }
    >
      {val}
    </div>
  );
}

export default function ClassRating(props) {
  return getColor(props.val, props.ratingType);
}
