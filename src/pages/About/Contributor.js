import React from "react";

// Component for about images
export default function Contributor(props) {
  return (
    <div className="overflow-hidden flex flex-col items-center group justify-center w-full shadow-md hover:shadow-2xl rounded bg-white border hover:border-blue-300">
      <a
        href={props.linkedin}
        target="_blank"
        rel="noreferrer"
        className="w-full flex flex-col"
      >
        <img className="w-full" src={props.img} alt="team-member" />
        <div className="flex flex-col w-full items-center justify-between py-5 px-10 sm:px-3 md:px-7 xl:px-10 md:h-64">
          <div className="flex flex-col w-full items-center justify-start">
            <h2 className="text-2xl md:text-base xl:text-lg 2xl:text-xl group-hover:text-blue-500 text-center w-full">
              {props.name}
            </h2>
            <h4 className="text-gray-600 text-lg md:text-sm xl:text-base leading-none mb-4 sm:mb-2 text-center w-full">
              {props.position}
            </h4>
            <ul className="list-disc text-left list-inside w-full text-gray-600">
              {props.description.split(",").map((item, key) => {
                return <li key={key}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </a>
    </div>
  );
}
