import React from "react";
import StatsRating from "./StatsRating";

// Displays current calendar's statistics
export default function CalendarStats(props) {
  return (
    <div className="w-full h-1/5 flex xl:py-4 overflow-hidden">
      <div className="flex flex-col w-1/2 items-center justify-center">
        {/* Circular stats */}
        <div className="flex justify-center items-center">
          <StatsRating text="course quality" val={props.stats.quality} />
          <StatsRating text="instructor quality" val={props.stats.instructor} />
        </div>
        <div className="flex justify-center items-center">
          <StatsRating text="course difficulty" val={props.stats.difficulty} />
          <StatsRating text="average workload" val={props.stats.workload} />
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2">
        {/* Rating stats */}
        <div className="flex flex-col w-3/5 justify-evenly text-xs xl:text-base whitespace-nowrap">
          <p className="uppercase">
            <span className="font-bold w-7 text-right inline-block">
              {props.stats.majorClasses}
            </span>{" "}
            major classes
          </p>
          <p className="uppercase">
            <span className="font-bold w-7 text-right inline-block">
              {props.stats.hubClasses}
            </span>{" "}
            hub classes
          </p>
          <p className="uppercase">
            <span className="font-bold w-7 text-right inline-block">
              {props.stats.newHubs}
            </span>{" "}
            new hub units
          </p>
          <p className="uppercase">
            <span className="font-bold w-7 text-right inline-block">
              {props.stats.hoursDay}
            </span>{" "}
            average hours/day
          </p>
          <p className="uppercase">
            <span className="font-bold w-7 text-right inline-block">
              {props.stats.hoursWeek}
            </span>{" "}
            total hours/week
          </p>
        </div>

        {/* Hour stats */}
        <div className="flex flex-col justify-between w-2/5 text-xs xl:text-base">
          <div className="flex flex-col">
            <h3 className="uppercase">earliest start</h3>
            <span className="font-bold">{props.stats.earliest}</span>
          </div>
          <div className="flex flex-col">
            <h3 className="uppercase">latest end</h3>
            <span className="font-bold">{props.stats.latest}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
