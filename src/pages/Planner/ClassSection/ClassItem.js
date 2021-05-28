import ClassRating from "./ClassRating";

// The item displayed in the class section/recommended section
const ClassItem = (props) => {
  let classCode =
    props.item.college + " " + props.item.department + " " + props.item.number;
  return (
    <div className="bg-white py-3 pl-5 flex">
      <div className="flex flex-col w-3/5">
        <span className="text-sm 2xl:text-lg mr-3 font-bold">{classCode}</span>
        <span className="text-sm overflow-ellipsis w-full whitespace-nowrap overflow-hidden">
          {props.item.title}
        </span>
      </div>
      <ClassRating
        ratingType="Quality"
        val={(Math.random() * 3 + 1 + Math.random()).toFixed(2)}
      />
      <ClassRating
        ratingType="Difficulty"
        val={(Math.random() * 3 + 1 + Math.random()).toFixed(2)}
      />
    </div>
  );
};

export default ClassItem;
