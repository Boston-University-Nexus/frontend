import React from "react";

// Component for about images
export default function Contributor(props) {
  return (
    <div className="overflow-hidden flex flex-col items-center group justify-center w-5/6 sm:w-1/3 md:w-1/4 shadow-md hover:shadow-2xl rounded bg-white border hover:border-blue-300">
      <a
        href={props.linkedin}
        target="_blank"
        rel="noreferrer"
        className="w-full"
      >
        <img className="w-full" src={props.img} alt="team-member" />
        <div className="flex flex-col w-full items-center justify-between h-52 p-5">
          <div className="flex flex-col w-full items-center justify-start">
            <h2 className="text-2xl md:text-base xl:text-lg 2xl:text-xl group-hover:text-blue-500 text-center w-full">
              {props.name}
            </h2>
            <h4 className="text-gray-600 text-lg md:text-sm xl:text-base leading-none mb-3 text-center w-full">
              {props.position}
            </h4>
            <p className="text-gray-600 text-base md:text-xs xl:text-sm leading-none text-center px-2 leading-relaxed">
              {props.description}
            </p>
          </div>
          {props.active && (
            <span className="text-blue-400 group-hover:text-green-400">
              Active
            </span>
          )}
        </div>
      </a>
    </div>
  );
}
