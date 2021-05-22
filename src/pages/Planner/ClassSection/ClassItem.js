import ClassRating from "./ClassRating";

const ClassItem = (props) => {
  let classCode =
    props.item.college + " " + props.item.department + " " + props.item.number;
  return (
    <div className="bg-white py-3 px-5 flex">
      <div className="flex flex-col w-3/5">
        <span className="text-lg mr-3">{classCode}</span>
        <span className="text-md overflow-ellipsis w-full whitespace-nowrap overflow-hidden">
          {props.item.title}
        </span>
      </div>
      <ClassRating ratingType="Quality" val="5" />
      <ClassRating ratingType="Difficulty" val="4" />
    </div>
  );
};

export default ClassItem;
