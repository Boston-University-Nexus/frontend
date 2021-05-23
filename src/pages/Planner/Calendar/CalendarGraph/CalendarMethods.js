// Calculates the difference in minutes from the top
export function textToTime(txt, top) {
  let hour = parseInt(txt.substring(0, 2));
  let min = parseInt(txt.substring(3, 5));

  let time = hour * 60 + min;
  let diff = time - top * 60;

  return diff / 60;
}

// Calculates the duration of a class in minutes
export function textToDiff(txt1, txt2) {
  let hour1 = parseInt(txt1.substring(0, 2));
  let min1 = parseInt(txt1.substring(3, 5));
  let time1 = hour1 * 60 + min1;

  let hour2 = parseInt(txt2.substring(0, 2));
  let min2 = parseInt(txt2.substring(3, 5));
  let time2 = hour2 * 60 + min2;

  return (time2 - time1) / 60;
}

// Basic math so that the cell is 40px when screen is 1920
// and 20 when screen is 768. Can be changed later
export function getCellHeight(windowWidth) {
  return 40 - (20 * (1920 - windowWidth)) / 1152;
}
