// Filters classes according to text typed
export function filter(searched) {
  if (searched === "") return [];

  let long_class = new RegExp(/^[a-z]{4,5}[0-9]*$/);
  let short_class = new RegExp(/^[a-z]{2}[0-9]*$/);
  let only_nums = new RegExp(/^[0-9]*$/);

  // CASCS111
  if (long_class.test(searched)) {
    return `course_code_contains=${searched.substring(0, 8)}`;
    // CS111
  } else if (
    (short_class.test(searched) && searched.length == 2) ||
    (only_nums.test(searched.substring(2, 5)) &&
      searched.length <= 5 &&
      searched.length > 2)
  ) {
    return `course_department_contains=${searched.substring(
      0,
      2
    )}&course_number_contains=${searched.substring(2, 5)}`;
    // CAS111
  } else if (
    only_nums.test(searched.substring(3, 6)) &&
    searched.length <= 6 &&
    searched.length > 3
  ) {
    return `course_college=${searched.substring(
      0,
      3
    )}&course_number_contains=${searched.substring(3, 6)}`;
    // CAS
  } else if (
    !only_nums.test(searched.substring(0, 3)) &&
    searched.length == 3
  ) {
    return `course_college=${searched.substring(0, 3)}`;
  } else if (searched.length == 1) {
    return `course_code_contains=${searched.substring(0, 1)}`;
  }

  return "";
}
