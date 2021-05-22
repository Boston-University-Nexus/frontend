import ClassRating from "./ClassRating";

const ClassItem = (props) => {
  let classCode =
    props.item.college + " " + props.item.department + " " + props.item.number;
  return (
    <div className="bg-white p-5 border border-gray-200 flex-flex-col">
      <div className="flex items-end w-full">
        <span className="text-lg mr-3">{classCode}</span>
        <span className="text-md overflow-ellipsis w-3/5 whitespace-nowrap overflow-hidden">
          {props.item.title}
        </span>
      </div>
      <div className="flex items-center mt-2">
        <ClassRating text="Difficulty" val="4" />
        <ClassRating text="Quality" val="5" />
      </div>
    </div>
  );
};

export default ClassItem;
