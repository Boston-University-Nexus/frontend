export const checkTypedType = (text) => {
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
    query_terms["college__icontains"] = text.substring(0, 3);
    query_terms["department__icontains"] = text.substring(3, 5);
    query_terms["number__icontains"] = text.substring(5, 8);
    return [["courses"], query_terms];
  }
  // CHECKS FOR AAABB000A
  else if (full_section_expr.test(text) && len <= 10) {
    query_terms["course__college__icontains"] = text.substring(0, 3);
    query_terms["course__department__icontains"] = text.substring(3, 5);
    query_terms["course__number__icontains"] = text.substring(5, 8);
    query_terms["section__icontains"] = text.substring(8, 10);
    return [["sections"], query_terms];
  }
  // CHECKS FOR BB0
  else if (
    half_course_expr.test(text) &&
    len <= 5 &&
    (len <= 2 || only_nums.test(text.substring(2, 5)))
  ) {
    query_terms["department__icontains"] = text.substring(0, 2);
    query_terms["number__icontains"] = text.substring(2, 5);
    return [["courses"], query_terms];
  }
  // CHECKS FOR BB000A
  else if (half_section_expr.test(text) && len <= 7) {
    query_terms["course__department__icontains"] = text.substring(0, 2);
    query_terms["course__number__icontains"] = text.substring(2, 5);
    query_terms["course__section__icontains"] = text.substring(5, 7);
    return [["sections"], query_terms];
  }
  // CHECKS FOR AAAB OR AAA0
  else if (college_expr.test(text) && len <= 6) {
    query_terms["college__icontains"] = text.substring(0, 3);
    if (only_nums.test(text.substring(3, 6)))
      query_terms["number__icontains"] = text.substring(3, 6);
    else query_terms["department__icontains"] = text.substring(3, 5);

    query_terms["professor__icontains"] = text_original;

    return [["courses", "professors"], query_terms];
    // CHECKS FOR ONLY LETTERS
  } else if (prof_expr.test(text)) {
    query_terms["professor__icontains"] = text_original;
    return [["professors"], query_terms];
  } else {
    return [[], {}]; // Something went wrong
  }

  // Test for CAS,CS,CASCS,CAS112,CS112,CASCS112,CS112A1,CASCS112A1,James,James Smith,James Smith-Ortega
};
