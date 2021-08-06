import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { request } from "../../../../middlewares/requests";
import {
  stateSaveCourses,
  stateSaveSchedules,
  stateSetPopups,
  stateSetVisibleSections,
} from "../../../../state/actions";

// Components
import CalendarItem from "./CalendarItem";

// Functions
import { getCellHeight } from "./CalendarMethods";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const compareArrOfObj = (arr1, arr2) => {
  if (!arr1 || !arr2) return true;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (
      arr1[i].title !== arr2[i].title ||
      arr1[i].displayed !== arr2[i].displayed
    ) {
      return false;
    }
  }

  return true;
};

function CalendarGraph(props) {
  const [calendarStart, setCalendarStart] = useState(9);
  const [calendarEnd, setCalendarEnd] = useState(17);
  const [activeSections, setActiveSections] = useState([]);
  const [sectionsList, setSectionsList] = useState([]);

  const [cellHeight, setCellHeight] = useState(50);

  // Returns a cell for every hour in a day
  const hours = () => {
    let arr = [];
    for (let i = calendarStart; i < calendarEnd; i++) {
      arr.push(
        <div
          className={i === calendarEnd - 1 ? "" : "border-b border-gray-300"}
          style={{ height: cellHeight + "px" }}
          key={i}
        ></div>
      );
    }

    return arr;
  };

  // Returns the hour text next to the scheduler
  const hourLeyend = () => {
    let arr = [];
    for (let i = calendarStart; i <= calendarEnd; i++) {
      let text = i % 12;
      if (i > 12) text += " PM";
      else if (i === 12) text = "12 PM";
      else text += " AM";

      arr.push(
        <div
          className="w-full flex items-center justify-end text-gray-600 whitespace-nowrap text-xs md:text-md transform -translate-y-1/2"
          style={{ height: cellHeight + "px" }}
          key={i}
        >
          {text}
        </div>
      );
    }

    return arr;
  };

  // On resize this is called
  const resize = () => {
    let cellHeight = getCellHeight(calendarStart, calendarEnd);
    setCellHeight(cellHeight);
  };

  // On load
  useEffect(() => {
    window.addEventListener("resize", resize);
    if (props.stateLoggedIn)
      request.get(process.env.REACT_APP_SERVER + "schedules/").then((res) => {
        if (res && !res.error) {
          props.stateSaveSchedules(res.data);
          setSectionsList(res.data[0].sections);
        } else if (!res) {
          props.stateSaveSchedules([[{ sections: [] }]]);
          setSectionsList([]);
        } else {
          props.stateSetPopups({
            ...props.statePopups,
            rateLimit: true,
          });
        }
      });

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // On update
  useEffect(() => {
    const same = compareArrOfObj(sectionsList, props.stateVisibleSections);

    if (!same) {
      // Get first and last class
      let bestStart = 24;
      let bestEnd = 0;

      for (const section of props.stateVisibleSections) {
        let start = parseInt(section.start.substring(0, 2));
        let end = parseInt(section.end.substring(0, 2));

        if (start - 1 < bestStart) bestStart = start - 1;
        if (end + 1 > bestEnd) bestEnd = end + 1;
      }

      setCalendarEnd(bestEnd);
      setCalendarStart(bestStart);

      // Gets cell height according to current window width and start/end
      let cellHeight = getCellHeight(bestStart, bestEnd);
      setCellHeight(cellHeight);

      // Save state so we know what the current calendar is
      var deepCopySections = JSON.parse(
        JSON.stringify(props.stateVisibleSections)
      );
      setSectionsList(deepCopySections);
    }
  });

  // Generates all the calendar sections in their corresponding day
  useEffect(() => {
    let sections = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
    };

    sectionsList.map((section, id) => {
      if (!(section.displayed === false))
        return section.days.split(",").map((day) => {
          return sections[day].push(
            <CalendarItem
              section={section}
              colorId={id}
              h={cellHeight}
              key={section.id}
              start={calendarStart}
            />
          );
        });
      return <></>;
    });

    setActiveSections(sections);
  }, [cellHeight, sectionsList]);

  return (
    <div className="flex w-full items-start">
      <div className="flex w-full h-full overflow-hidden items-start">
        <div
          className="flex flex-col w-1/12 mr-1 text-xs xl:mt-0 xl:text-sm"
          style={{ marginTop: window.innerHeight * 0.05 + "px" }}
        >
          {hourLeyend()}
        </div>
        <div className="flex w-11/12 h-full">
          {daysOfWeek.map((i, idx) => {
            return (
              <div className="flex flex-col w-full relative" key={i}>
                <div
                  className="uppercase text-gray-600 flex items-center justify-center text-xs lg:text-sm xl:text-base"
                  style={{ height: window.innerHeight * 0.05 + "px" }}
                >
                  {window.innerWidth > 768 ? i : i.substring(0, 3)}
                </div>
                <div
                  className={
                    "flex flex-col " +
                    (i === daysOfWeek[0]
                      ? "border border-gray-300"
                      : "border border-l-0 border-gray-300")
                  }
                >
                  {hours()}
                </div>
                {activeSections[i.slice(0, 1).toUpperCase() + i.slice(1, 3)]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateSchedules: state.root.stateSchedules,
    stateVisibleSections: state.root.stateVisibleSections,
    stateLoggedIn: state.users.stateLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSaveCourses: (calendars) => dispatch(stateSaveCourses(calendars)),
    stateSaveSchedules: (calendar) => dispatch(stateSaveSchedules(calendar)),
    stateSetVisibleSections: (sections) =>
      dispatch(stateSetVisibleSections(sections)),
    stateSetPopups: (sections) => dispatch(stateSetPopups(sections)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarGraph);
