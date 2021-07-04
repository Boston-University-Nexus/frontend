import React from "react";

export default function Contributor(props) {
  return (
    <div className="overflow-hidden flex flex-col items-center justify-center w-full sm:w-1/3 md:w-1/4 m-4 shadow-md rounded bg-white pb-10">
      <img className="w-full" src={props.img} alt="team-member" />
      <a
        href={props.linkedin}
        className="text-xl mt-3 hover:text-blue-500"
        target="_blank"
        rel="noreferrer"
      >
        {props.name}
      </a>
      <h4 className="text-gray-600 text-sm leading-none">{props.position}</h4>
    </div>
  );
}
