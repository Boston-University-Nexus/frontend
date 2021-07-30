import React, { Component } from "react";

// Icons
import { IoLocationSharp } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";

// Components
import SectionRating from "./SectionRating";

const getDayInits = (days) => {
  let str = "";
  for (const day of days) {
    if (day === "Thu") str += "r";
    else str += day.substring(0, 1);
  }

  return str;
};

export default class SectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: <TiPlus />,
      status: "normal",
    };

    this.handleSectionChange = this.handleSectionChange.bind(this);
  }

  handleSectionChange() {
    if (this.state.status !== "added")
      this.setState({ status: "added", active: <FaMinus /> });
    else this.setState({ status: "normal", active: <TiPlus /> });
  }

  render() {
    let item = this.props.item;
    return (
      <div className="flex justify-between items-center text-xs py-3 hover:bg-blue-100 transition-colors pl-4 pr-1">
        <div className="flex flex-col justify-center w-1/3">
          <div className="flex items-end gap-1">
            <h1 className="font-black text-base">{item.section_code}</h1>
            <h2 className="uppercase">{item.section_type.substring(0, 3)}</h2>
          </div>
          <h2 className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {item.professor_name}
          </h2>
        </div>
        <div className="flex flex-col justify-center w-1/3">
          <div className="flex items-end gap-1">
            <h1 className="font-black uppercase">
              {getDayInits(item.section_days.split(","))}
            </h1>
            <h2 className="uppercase">
              {item.section_start.substring(0, 5)}-
              {item.section_end.substring(0, 5)}
            </h2>
          </div>
          <h2 className="flex items-center">
            <IoLocationSharp />
            {item.building || "TBD"}
          </h2>
        </div>
        <div className="flex w-1/3 justify-evenly items-center">
          <SectionRating
            ratingType="Professor"
            val={item.section_professorRating}
          />
          <SectionRating
            ratingType="Workload"
            val={item.section_workloadRating}
          />
          <button
            className={
              "cursor-pointer focus:outline-none w-7 flex items-center justify-center " +
              (this.state.status === "normal"
                ? "hover:text-green-500 text-2xl"
                : "hover:text-red-500 text-xl")
            }
            onClick={this.handleSectionChange}
          >
            {this.state.active}
          </button>
        </div>
      </div>
    );
  }
}
