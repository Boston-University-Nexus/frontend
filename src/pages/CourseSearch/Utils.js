import { Link } from "react-router-dom";

export const checkTypedType = (text) => {
  // IF SEARCH BAR EMPTY
  if (text.length === 0) return [[], {}];

  let text_original = text;
  text = text.replace(/\s/g, "").toLowerCase();
  let len = text.length;

  // REGEX EXPRESSIONS
  let full_section_expr = new RegExp(/\b[a-z]{5}[0-9]{3}[a-z]/);
  let full_course_expr = new RegExp(/\b[a-z]{5}[0-9]+/);

  let half_course_expr = new RegExp(/[a-z]{2}/);
  let half_section_expr = new RegExp(/[a-z]{2}[0-9]{3}[a-z]/);

  let college_expr = new RegExp(/[a-z]{3}/);
  let prof_expr = new RegExp(/[a-z]*/);
  let only_nums = new RegExp(/^\d+$/);

  let query_terms = {};

  // CHECKS FOR AAABB0
  if (full_course_expr.test(text) && len <= 8) {
    query_terms["course_college_contains"] = text.substring(0, 3);
    query_terms["course_department_contains"] = text.substring(3, 5);
    query_terms["course_number_contains"] = text.substring(5, 8);
    return [["courses"], query_terms];
  }
  // CHECKS FOR AAABB000A
  else if (full_section_expr.test(text) && len <= 10) {
    query_terms["course_college_contains"] = text.substring(0, 3);
    query_terms["course_department_contains"] = text.substring(3, 5);
    query_terms["course_number_contains"] = text.substring(5, 8);
    query_terms["section_code_contains"] = text.substring(8, 10);
    return [["sections"], query_terms];
  }
  // CHECKS FOR BB0
  else if (
    half_course_expr.test(text) &&
    len <= 5 &&
    (len <= 2 || only_nums.test(text.substring(2, 5)))
  ) {
    query_terms["course_department_contains"] = text.substring(0, 2);
    query_terms["course_number_contains"] = text.substring(2, 5);
    return [["courses"], query_terms];
  }
  // CHECKS FOR BB000A
  else if (half_section_expr.test(text) && len <= 7) {
    query_terms["course_department_contains"] = text.substring(0, 2);
    query_terms["course_number_contains"] = text.substring(2, 5);
    query_terms["course_section_contains"] = text.substring(5, 7);
    return [["sections"], query_terms];
  }
  // CHECKS FOR AAAB OR AAA0
  else if (college_expr.test(text) && len <= 6) {
    query_terms["course_college_contains"] = text.substring(0, 3);
    if (only_nums.test(text.substring(3, 6)))
      query_terms["course_number_contains"] = text.substring(3, 6);
    else query_terms["course_department_contains"] = text.substring(3, 5);

    query_terms["professor"] = text_original;

    return [["courses", "professors"], query_terms];
    // CHECKS FOR ONLY LETTERS
  } else if (prof_expr.test(text)) {
    query_terms["professor"] = text_original;
    return [["professors"], query_terms];
  } else {
    return [[], {}]; // Something went wrong
  }

  // Test for CAS,CS,CASCS,CAS112,CS112,CASCS112,CS112A1,CASCS112A1,James,James Smith,James Smith-Ortega
};

export const formatTime = (time) => {
  time = time.substring(0, time.length - 3);

  let pmam = "";
  let hour = parseInt(time.substring(0, 2));

  // Getting AM or PM
  if (hour >= 12 && hour < 24) pmam = "pm";
  else pmam = "am";

  // Converting to 12h format
  if (hour > 12) hour = hour % 12;

  time = hour + time.substring(2, 5) + pmam.toUpperCase();

  return time;
};

export const formatProfessor = (prof) => {
  prof = (
    <Link
      to={"/coursesearch/professors?professor=" + prof}
      className="hover:text-blue-500"
    >
      {prof}
    </Link>
  );
  return prof;
};

export const formatDays = (days) => {
  return days.replaceAll(",", ", ");
};

export const formatDaysLong = (days) => {
  days = days.split(",");
  console.log(days);

  let daysLong = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
  };
  let result = "";
  for (const day of days) result += daysLong[day] + ", ";

  return result.substr(0, result.length - 2);
};

export const formatPrereqs = (prereqs) => {
  if (!prereqs || prereqs.length === 0) return "-";

  prereqs = prereqs.split(",");

  let result = [];

  for (let i = 0; i < prereqs.length; i++) {
    result.push(
      <a
        href={"/coursesearch/courses?course=" + prereqs[i]}
        className="hover:text-blue-500"
      >
        {prereqs[i].substring(3, prereqs[i].length)}
      </a>
    );
    result.push(", ");
  }

  return result.slice(0, result.length - 1);
};

export const formatRating = (rating, type) => {
  rating = parseFloat(rating);
  if (rating === 0)
    return (
      <div className="flex items-center justify-center text-gray-800">TBD</div>
    );
  else {
    let color = "text-gray-600";

    if (type === "P") {
      if (rating < 2.33) color = "text-red-600";
      else if (rating < 3.66) color = "text-yellow-600";
      else color = "text-green-600";

      rating = rating + "/5";
    } else {
      if (rating < 2.33) color = "text-green-600";
      else if (rating < 3.66) color = "text-yellow-600";
      else color = "text-red-600";

      rating = rating + "/5";
    }

    return (
      <div className={"flex items-center justify-center " + color}>
        {rating}
      </div>
    );
  }
};

export const ratingToDiv = (rating, text) => {
  rating = parseInt(rating) === 0 ? "TBD" : parseFloat(rating);
  let color = "text-gray-600";

  if ((text === "Quality:" || text === "Professor:") && rating !== "TBD") {
    if (rating < 2.33) color = "text-red-500";
    else if (rating < 3.66) color = "text-yellow-500";
    else color = "text-green-500";

    rating = rating + "/5";
  } else if (text === "Workload:" && rating !== "TBD") {
    if (rating < 2.33) color = "text-green-500";
    else if (rating < 3.66) color = "text-yellow-500";
    else color = "text-red-500";

    rating = rating + "/5";
  } else if (rating !== "TBD") {
    if (rating < 2.33) rating = "LOW";
    else if (rating < 3.66) rating = "MEDIUM";
    else rating = "HARD";
  }

  return (
    <div
      className={
        "px-3 font-bold bg-gray-100 rounded-full flex items-center justify-center " +
        color
      }
    >
      {text + " " + rating}
    </div>
  );
};
