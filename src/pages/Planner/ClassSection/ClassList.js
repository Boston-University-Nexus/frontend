import React, { useCallback, useState } from "react";
import { connect } from "react-redux";

// Functions
import {
  stateDisplayCourse,
  stateSaveCourses,
  stateSetPopups,
} from "../../../state/actions";
import { filter } from "../Functions";
import { debounce } from "lodash";

// Components
import NotFound from "./NotFound";
import StartTyping from "./StartTyping";
import SearchBar from "./SearchBar";
import ClassItem from "./ClassItem";
import ClassCard from "./ClassCard";

import { request } from "../../../middlewares/requests";

function ClassList(props) {
  const [hasTyped, setHasTyped] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [sql_page, setSqlPage] = useState(0);
  const [prev_query, setPrevQuery] = useState("");

  // Calls db
  const makeQuery = (query) => {
    query = query.toLowerCase().replaceAll(" ", "");
    let max = parseInt(process.env.REACT_APP_SQL_MAX_ITEMS);

    request
      .get(process.env.REACT_APP_SERVER + "courses?" + query)
      .then((res) => {
        if (res && !res.error) {
          props.stateSaveCourses(res.data);
          setHasMore(res.data.length === max);
        } else if (!res) props.stateSaveCourses([]);
        else {
          props.stateSetPopups({
            ...props.statePopups,
            rateLimit: true,
          });
        }
      });
  };

  // Debounces the function call with params query
  const debounceQuery = useCallback(
    debounce((query, call) => call(query), 400),
    []
  );

  // Loads classes based on type (either queries db or filters with JS)
  const handleType = (e) => {
    setHasTyped(true);
    let nowTyped = e.target.value;

    // If user deleted a character, pasted something different, or
    // there are more classes to load than what we received
    if (nowTyped == "") {
      setHasTyped(false);
      props.stateSaveCourses([]);
    } else {
      // Saved typed text to compare after
      setTypedText(nowTyped);

      // Delete class stack (for course cards)
      props.stateDisplayCourse([]);

      // Get type of query we should make
      let query = filter(nowTyped);

      if (query != "") {
        // Call helper function filter and reset state
        setPrevQuery(query);
        setSqlPage(0);
        debounceQuery(query, makeQuery);
      } else {
        props.stateSaveCourses([]);
      }
    }
  };

  return (
    <div className="bg-white shadow-xl flex flex-col w-full mb-4 overflow-hidden h-full">
      <SearchBar handleTypeSearch={handleType} isOpen={props.open} />

      {props.stateCourseStack.length === 0 && (
        <div
          className="flex flex-col w-full items-center justify-center"
          style={{ height: "calc(100% - 55px)" }}
        >
          {/* INDICATES WHAT EACH ITEM IS */}
          <div className="py-2 pl-4 pr-2 flex justify-between uppercase font-bold text-gray-600 text-xs lg:text-sm xl:text-lg w-full">
            <span className="w-3/5">course</span>
            <div className="flex w-2/5 justify-center items-center">
              <span className="text-center">qual/diff</span>
            </div>
          </div>

          {/* DISPLAYED CLASSES */}
          <div className="flex flex-col flex-grow w-full overflow-y-scroll h-5/6">
            {/* IF CLASSES */}
            {props.stateCourses.map((item, key) => {
              return (
                <ClassItem
                  item={item}
                  key={key}
                  toggleMenu={props.toggleMenu}
                />
              );
            })}

            {/* IF EMPTY SEARCH */}
            {props.stateCourses.length === 0 && typedText.length < 1 && (
              <StartTyping />
            )}

            {/* IF NOT FOUND */}
            {props.stateCourses.length === 0 && typedText.length > 0 && (
              <NotFound />
            )}
          </div>
        </div>
      )}
      {props.stateCourseStack.length > 0 && (
        <ClassCard
          item={props.stateCourseStack[props.stateCourseStack.length - 1]}
        />
      )}
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateCourses: state.root.stateCourses,
    stateCourseStack: state.root.stateCourseStack,
    statePopups: state.events.statePopups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSaveCourses: (classes) => dispatch(stateSaveCourses(classes)),
    stateDisplayCourse: (classes) => dispatch(stateDisplayCourse(classes)),
    stateSetPopups: (boolean) => dispatch(stateSetPopups(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);
