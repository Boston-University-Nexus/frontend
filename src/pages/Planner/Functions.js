// Filters classes according to text typed
export function filter(searched) {
  let clean_searched = searched.replaceAll(" ", "").toLowerCase();
  searched = searched.trimStart();

  if (clean_searched === "") return [];

  let college_and_num = new RegExp(/^[a-z]{3}[0-9]*$/);
  let only_test = new RegExp(/^\D{6,}$/);

  // If CAS123
  if (college_and_num.test(clean_searched)) {
    return `course_college=${clean_searched.substring(
      0,
      3
    )}&course_number_contains=${searched.substring(3, 6)}`;
  } else if (only_test.test(searched)) {
    return `course_title_contains=${searched}`;
  } else {
    return `course_code_contains=${clean_searched.substring(0, 8)}`;
  }
}
