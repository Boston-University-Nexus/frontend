// Filters classes according to text typed
export function filter(numWords, classes, val) {
  if (val[0] == "") return [];

  let currentClasses;

  if (numWords == 1)
    currentClasses = classes.filter(function (el) {
      return (
        el.college.toLowerCase().includes(val[0]) ||
        el.department.toLowerCase().includes(val[0]) ||
        el.number.toLowerCase().includes(val[0])
      );
    });
  else if (numWords == 2)
    currentClasses = classes.filter(function (el) {
      return (
        (el.college.toLowerCase().includes(val[0]) &&
          el.department.toLowerCase().includes(val[1])) ||
        (el.department.toLowerCase().includes(val[0]) &&
          el.number.toLowerCase().includes(val[1]))
      );
    });
  else if (numWords == 3)
    currentClasses = classes.filter(function (el) {
      return (
        el.college.toLowerCase().includes(val[0]) &&
        el.department.toLowerCase().includes(val[1]) &&
        el.number.toLowerCase().includes(val[2])
      );
    });
  else currentClasses = classes;

  return currentClasses;
}
