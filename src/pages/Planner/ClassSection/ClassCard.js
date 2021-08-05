import React, { Component, useEffect, useState } from "react";

// Icons
import { FiExternalLink } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

import { connect } from "react-redux";
import { stateDisplayCourse } from "../../../state/actions";
import { request } from "../../../middlewares/requests";
import SectionItem from "./SectionItem";

function ClassCard(props) {
  const [course, setCourse] = useState();
  const [hubs, setHubs] = useState();
  const [sections, setSections] = useState();

  const [shortDescription, setShortDescription] = useState(true);

  // Format prereqs links
  const formatPrereqs = (prereqs_codes, prereqs_ids) => {
    prereqs_codes = JSON.parse(prereqs_codes);
    prereqs_ids = JSON.parse(prereqs_ids);

    return prereqs_codes.map((prq_group, group_idx) => {
      return (
        <>
          {prq_group.map((prq, idx) => {
            return (
              <>
                <button
                  className="inline text-blue-500 hover:text-blue-600 transition-colors font-bold"
                  onClick={() => {
                    props.stateDisplayCourse([
                      ...props.stateCourseStack,
                      parseInt(prereqs_ids[group_idx][idx]),
                    ]);
                  }}
                  key={idx * group_idx}
                >
                  {prq.substring(3, 8)}
                </button>
                {idx < prq_group.length - 1 && " and "}
              </>
            );
          })}
          {group_idx < prereqs_codes.length - 1 && " or "}
        </>
      );
    });
  };

  // Shortens description
  const formatDescription = (descr) => {
    if (descr.length > 150) {
      return (
        <>
          {shortDescription ? descr.substring(0, 150) + "..." : descr}
          <button
            className="text-blue-500 font-bold cursor-pointer hover:text-blue-600 transition-colors inline"
            onClick={() => setShortDescription(!shortDescription)}
          >
            {shortDescription && "see more"}
            {!shortDescription && "see less"}
          </button>
        </>
      );
    } else {
      return descr;
    }
  };

  const getCourse = () => {
    let url = "courses?course_ID=" + props.item + "&options=prereqs";

    request.get(process.env.REACT_APP_SERVER + url).then((res) => {
      console.log(res);

      if (res && res.data) setCourse(res.data[0]);
      else console.log(props.item);
    });
  };

  const getHubs = () => {
    let url = "hubs?course_ID=" + props.item;

    request.get(process.env.REACT_APP_SERVER + url).then((res) => {
      if (res) setHubs(res.data.map((a) => a.buhub_name));
      else setHubs([]);
    });
  };

  const getSections = async () => {
    let url = "sections?course_ID=" + props.item;

    // Get all sections
    request.get(process.env.REACT_APP_SERVER + url).then((res) => {
      if (res) setSections(res.data);
      else setSections([]);
    });
  };

  const removeClassFromStack = () => {
    let currentStack = [...props.stateCourseStack];
    currentStack.splice(currentStack.length - 1, 1);

    props.stateDisplayCourse([...currentStack]);
  };

  useEffect(() => {
    getCourse();
    getHubs();
    getSections();
  }, [props.stateCourseStack]);

  if (hubs && sections && course) {
    return (
      <div className="w-full h-full">
        <div className="p-4">
          <button
            className="flex items-center justify-start text-gray-600 w-full focus:outline-none hover:text-black transition-colors mb-4"
            onClick={removeClassFromStack}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="font-black lg:text-xl xl:text-2xl">
            {course.course_code}
          </h1>
          <h2 className="text-lg mb-1">{course.course_title}</h2>
          <div className="flex">
            <a
              href={"/coursesearch/courses?course=" + course.course_code}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 border border-solid border-blue-500 rounded-full px-3 py-1 bg-blue-100 hover:bg-blue-200 hover:text-blue-600 hover:border-blue-600 transition-colors mt-1 text-sm flex items-center"
            >
              <span>View on Course Search</span>
              <FiExternalLink className="inline align-middle ml-1" />
            </a>
          </div>
        </div>
        <div
          className="flex w-full h-full items-start justify-start flex-col overflow-y-scroll"
          style={{ height: "calc(100% - 228px)" }}
        >
          <div className="text-gray-600 px-4 pb-4">
            {hubs.length > 0 && (
              <div className="flex flex-wrap items-center text-sm gap-2">
                <p>Hub Areas:</p>
                {hubs.map((thisItem, key) => {
                  return (
                    <div
                      className="bg-gray-200 rounded-full px-3 py-1"
                      key={key}
                    >
                      {thisItem}
                    </div>
                  );
                })}
              </div>
            )}
            {course.course_prereqs !== "[]" && (
              <div className="mt-4 text-sm">
                <p className="inline">Prerequisites: </p>
                {formatPrereqs(
                  course.course_prereqs,
                  course.course_prereqs_ids
                )}
                ; or equivalent.
              </div>
            )}
            <p className="text-sm mt-4">
              {formatDescription(course.course_description)}
            </p>
          </div>

          <div className="flex flex-col w-full">
            <div className="uppercase text-gray-600 font-black flex justify-between w-full px-4">
              <span className="w-1/3">section</span>
              <div className="w-1/3">
                <span>prof/work</span>
              </div>
            </div>
            <div className="flex flex-col w-full">
              {sections.map((item, key) => {
                return <SectionItem item={item} key={key} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else return <p>Loading...</p>;
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateCourseStack: state.root.stateCourseStack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateDisplayCourse: (classes) => dispatch(stateDisplayCourse(classes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassCard);
