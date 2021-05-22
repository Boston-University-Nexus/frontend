import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

function getColor(val, type) {
  // Decides the color based on the rating
  if (type === "course quality" || type === "instructor quality") {
    if (val < 5 / 3) return ["#EF4444", "#FECACA"];
    else if (val < 10 / 3) return ["#FBBF24", "#FDE68A"];
    else return ["#34D399", "#A7F3D0"];
  } else {
    if (val < 5 / 3) return ["#34D399", "#A7F3D0"];
    else if (val < 10 / 3) return ["#FBBF24", "#FDE68A"];
    else return ["#EF4444", "#FECACA"];
  }
}

export default function StatsRating(props) {
  let col = getColor(props.val, props.text);

  return (
    <div className="flex items-center m-4">
      <div className="w-12 h-12 mr-2 text-center">
        <CircularProgressbarWithChildren
          value={props.val}
          maxValue={5}
          className="flex items-center justify-center"
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",

            // Text size
            textSize: "2.5rem",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: col[0],
            textColor: col[0],
            trailColor: col[1],
            backgroundColor: "#3e98c7",
          })}
        >
          <div className="flex w-full h-full items-center justify-center font-bold text-xl">
            {props.val}
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <h3 className="uppercase w-20 font-medium">{props.text}</h3>
    </div>
  );
}
