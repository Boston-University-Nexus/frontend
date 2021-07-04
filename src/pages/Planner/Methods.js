// Filters classes according to text typed
export function filter(searched, currentClasses) {
  if (searched === "") return [];

  let long_class = new RegExp(/[a-z]{5}/);
  let short_class = new RegExp(/[a-z]{2}/);
  let only_nums = new RegExp(/^[0-9]*$/);

  // CASCS111
  if (long_class.test(searched)) {
    currentClasses = currentClasses.filter(function (el) {
      return (
        el.college.toLowerCase().includes(searched.substring(0, 3)) &&
        el.department.toLowerCase().includes(searched.substring(3, 5)) &&
        el.number.includes(searched.substring(5, 8))
      );
    });
    // CS111
  } else if (
    (short_class.test(searched) && searched.length == 2) ||
    (only_nums.test(searched.substring(2, 5)) &&
      searched.length <= 5 &&
      searched.length > 2)
  ) {
    currentClasses = currentClasses.filter(function (el) {
      return (
        el.department.toLowerCase().includes(searched.substring(0, 2)) &&
        el.number.includes(searched.substring(2, 5))
      );
    });
    // CAS111
  } else if (
    only_nums.test(searched.substring(3, 6)) &&
    searched.length <= 6 &&
    searched.length > 3
  ) {
    currentClasses = currentClasses.filter(function (el) {
      return (
        el.college.toLowerCase().includes(searched.substring(0, 3)) &&
        el.number.includes(searched.substring(3, 6))
      );
    });
    // CAS
  } else if (
    !only_nums.test(searched.substring(0, 3)) &&
    searched.length <= 3
  ) {
    currentClasses = currentClasses.filter(function (el) {
      return el.college.toLowerCase().includes(searched.substring(0, 3));
    });
  } else currentClasses = [];

  return currentClasses;
}
