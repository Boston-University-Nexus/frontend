// Filters classes according to text typed
export function filter(searched) {
  if (searched === "") return [];

  let college_and_num = new RegExp(/^[a-z]{3}[0-9]*$/);

  // If CAS123
  if (college_and_num.test(searched)) {
    return `course_college=${searched.substring(
      0,
      3
    )}&course_number_contains=${searched.substring(3, 6)}`;
  } else {
    return `course_code_contains=${searched.substring(0, 8)}`;
  }
}
