(this.webpackJsonpfrontend = this.webpackJsonpfrontend || []).push([
  [0],
  {
    51: function (e, t, s) {},
    81: function (e, t, s) {
      "use strict";
      s.r(t);
      var n = s(2),
        a = s.n(n),
        c = s(28),
        l = s.n(c),
        r = (s(51), s(19)),
        i = s(7),
        o = s(3),
        d = s(4),
        u = s(6),
        h = s(5),
        j = s(1),
        b = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return Object(o.a)(this, s), ((n = t.call(this, e)).state = {}), n;
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(j.jsxs)("div", {
                    className:
                      "flex w-full h-full justify-center items-center text-4xl",
                    children: [
                      Object(j.jsx)("a", {
                        className:
                          "text-white bg-blue-500 py-4 px-7 rounded transform hover:scale-105 mx-5",
                        href: "/planner",
                        children: "Go to planner",
                      }),
                      Object(j.jsx)("a", {
                        className:
                          "text-white bg-blue-500 py-4 px-7 rounded transform hover:scale-105 mx-5",
                        href: "/coursesearch",
                        children: "Go to course search",
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component);
      function x() {
        return Object(j.jsx)("div", {
          className: "flex items-end uppercase h-full text-center p-4",
          children: Object(j.jsxs)("div", {
            className:
              "h-2/3 xl:1/2 2xl:h-1/3 w-full flex flex-col justify-between",
            children: [
              Object(j.jsxs)("div", {
                children: [
                  Object(j.jsx)("h2", {
                    className: "font-bold text-sm xl:text-lg",
                    children: "no results found!",
                  }),
                  Object(j.jsx)("p", {
                    className: "text-xs xl:text-sm",
                    children: "nothing matched your search terms",
                  }),
                ],
              }),
              Object(j.jsx)("div", {
                children: Object(j.jsx)("p", {
                  className: "text-xs",
                  children: "tip: broaden your search terms for more results",
                }),
              }),
            ],
          }),
        });
      }
      var p = s(9),
        f = s(11),
        m = s(22),
        O = s.n(m),
        v = "SAVE_CLASSES",
        g = "FILTER_CLASSES",
        y = "CLASS_STACK",
        w = "SAVE_CALENDARS",
        N = "SAVE_SECTIONS",
        C = "CHANGE_CALENDAR",
        k = function (e) {
          return { type: y, payload: e };
        },
        S = function (e) {
          return { type: w, payload: e };
        },
        A = function (e) {
          return { type: C, payload: e };
        };
      function M() {
        return Object(j.jsx)("div", {
          className: "flex items-end uppercase h-full text-center p-4",
          children: Object(j.jsxs)("div", {
            className:
              "h-2/3 xl:1/2 2xl:h-1/3 w-full flex flex-col justify-between",
            children: [
              Object(j.jsxs)("div", {
                children: [
                  Object(j.jsx)("h2", {
                    className: "font-bold text-sm xl:text-lg",
                    children: "start searching...",
                  }),
                  Object(j.jsx)("p", {
                    className: "text-xs xl:text-sm",
                    children: "find courses, departments & instructors",
                  }),
                ],
              }),
              Object(j.jsx)("div", {
                children: Object(j.jsx)("p", {
                  className: "text-xs",
                  children:
                    "tip: use filters if you are looking for something specific",
                }),
              }),
            ],
          }),
        });
      }
      var T = s(10),
        E = s(24),
        L = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s() {
            return Object(o.a)(this, s), t.apply(this, arguments);
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(j.jsxs)("div", {
                    className:
                      "flex items-center pr-4 w-full bg-blue-100 transition-none",
                    children: [
                      Object(j.jsx)("input", {
                        type: "text",
                        placeholder: "SEARCH...",
                        onChange: this.props.handleType,
                        className:
                          "w-10/12 h-full text-base xl:text-xl pl-4 py-4 focus:outline-none focus:border focus:border-solid focus:border-blue-500 bg-blue-100 placeholder-gray-600",
                      }),
                      Object(j.jsx)("button", {
                        className:
                          "h-full w-1/12 flex items-center justify-center mx-2 text-gray-600",
                        children: Object(j.jsx)(E.c, { className: "text-xl" }),
                      }),
                      Object(j.jsx)("button", {
                        className:
                          "h-full w-1/12 flex items-center justify-center text-gray-600",
                        children: Object(j.jsx)(T.f, { className: "text-xl" }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        D = s(20);
      function F(e) {
        return Object(j.jsx)("div", {
          className:
            "px-3 py-1 rounded-full w-1/3 h-8 flex items-center justify-center text-sm " +
            ((t = e.val),
            (s = e.ratingType),
            t < 1
              ? "bg-gray-200"
              : "Quality" === s
              ? t < 5 / 3
                ? "bg-red-300"
                : t < 10 / 3
                ? "bg-yellow-200"
                : "bg-green-300"
              : t < 5 / 3
              ? "bg-green-300"
              : t < 10 / 3
              ? "bg-yellow-200"
              : "bg-red-300"),
          children: Object(j.jsx)("span", {
            className: "font-bold",
            children: e.val < 0 ? "--" : e.val,
          }),
        });
        var t, s;
      }
      var W = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).display = n.display.bind(Object(p.a)(n))),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "display",
                value: function () {
                  this.props.toggleMenu(null, !1),
                    this.props.stateDisplayCourse(
                      [].concat(Object(D.a)(this.props.stateCourseStack), [
                        this.props.item,
                      ])
                    );
                },
              },
              {
                key: "render",
                value: function () {
                  var e =
                    this.props.item.college +
                    " " +
                    this.props.item.department +
                    " " +
                    this.props.item.number;
                  return Object(j.jsxs)("div", {
                    className:
                      "bg-white py-3 pl-4 pr-2 flex hover:bg-blue-100 cursor-pointer transition justify-between items-center",
                    onClick: this.display,
                    children: [
                      Object(j.jsxs)("div", {
                        className: "flex flex-col w-3/5",
                        children: [
                          Object(j.jsx)("span", {
                            className:
                              "text-xs lg:text-base xl:text-lg mr-3 font-bold",
                            children: e,
                          }),
                          Object(j.jsx)("span", {
                            className:
                              "text-xs lg:text-sm overflow-ellipsis w-full whitespace-nowrap overflow-hidden",
                            children: this.props.item.title,
                          }),
                        ],
                      }),
                      Object(j.jsxs)("div", {
                        className:
                          "flex w-2/5 gap-1 justify-evenly items-center",
                        children: [
                          Object(j.jsx)(F, {
                            ratingType: "Quality",
                            val: this.props.item.qualityRating,
                          }),
                          Object(j.jsx)(F, {
                            ratingType: "Difficulty",
                            val: this.props.item.difficultyRating,
                          }),
                        ],
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        R = Object(f.b)(
          function (e) {
            return { classStack: e.classStack };
          },
          function (e) {
            return {
              stateDisplayCourse: function (t) {
                return e(k(t));
              },
            };
          }
        )(W),
        H = s(18),
        _ = s(30),
        z = s(26),
        q = s(33);
      function B(e) {
        return Object(j.jsx)("div", {
          className:
            "px-2 rounded-full w-1/4 h-6 flex items-center justify-center text-xs " +
            ((t = e.val),
            (s = e.ratingType),
            t < 1
              ? "bg-gray-200"
              : "Professor" === s
              ? t < 5 / 3
                ? "bg-red-300"
                : t < 10 / 3
                ? "bg-yellow-200"
                : "bg-green-300"
              : t < 5 / 3
              ? "bg-green-300"
              : t < 10 / 3
              ? "bg-yellow-200"
              : "bg-red-300"),
          children: Object(j.jsx)("span", {
            className: "font-bold",
            children: e.val < 0 ? "--" : e.val,
          }),
        });
        var t, s;
      }
      var I = function (e) {
          var t,
            s = "",
            n = Object(H.a)(e);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              var a = t.value;
              s += "Thu" === a ? "r" : a.substring(0, 1);
            }
          } catch (c) {
            n.e(c);
          } finally {
            n.f();
          }
          return s;
        },
        P = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).state = {
                active: Object(j.jsx)(q.a, {}),
                status: "normal",
              }),
              (n.handleSectionChange = n.handleSectionChange.bind(
                Object(p.a)(n)
              )),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "handleSectionChange",
                value: function () {
                  "added" !== this.state.status
                    ? this.setState({
                        status: "added",
                        active: Object(j.jsx)(T.g, {}),
                      })
                    : this.setState({
                        status: "normal",
                        active: Object(j.jsx)(q.a, {}),
                      });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.props.item;
                  return Object(j.jsxs)("div", {
                    className:
                      "flex justify-between items-center text-xs py-3 hover:bg-blue-100 transition-colors pl-4 pr-1",
                    children: [
                      Object(j.jsxs)("div", {
                        className: "flex flex-col justify-center w-1/3",
                        children: [
                          Object(j.jsxs)("div", {
                            className: "flex items-end gap-1",
                            children: [
                              Object(j.jsx)("h1", {
                                className: "font-black text-base",
                                children: e.section,
                              }),
                              Object(j.jsx)("h2", {
                                className: "uppercase",
                                children: e.type.substring(0, 3),
                              }),
                            ],
                          }),
                          Object(j.jsx)("h2", {
                            className:
                              "overflow-hidden overflow-ellipsis whitespace-nowrap",
                            children: e.professor.name,
                          }),
                        ],
                      }),
                      Object(j.jsxs)("div", {
                        className: "flex flex-col justify-center w-1/3",
                        children: [
                          Object(j.jsxs)("div", {
                            className: "flex items-end gap-1",
                            children: [
                              Object(j.jsx)("h1", {
                                className: "font-black uppercase",
                                children: I(e.days.split(",")),
                              }),
                              Object(j.jsxs)("h2", {
                                className: "uppercase",
                                children: [
                                  e.start.substring(0, 5),
                                  "-",
                                  e.end.substring(0, 5),
                                ],
                              }),
                            ],
                          }),
                          Object(j.jsxs)("h2", {
                            className: "flex items-center",
                            children: [
                              Object(j.jsx)(z.b, {}),
                              e.building || "TBD",
                            ],
                          }),
                        ],
                      }),
                      Object(j.jsxs)("div", {
                        className: "flex w-1/3 justify-evenly items-center",
                        children: [
                          Object(j.jsx)(B, {
                            ratingType: "Professor",
                            val: e.professorRating,
                          }),
                          Object(j.jsx)(B, {
                            ratingType: "Workload",
                            val: e.workloadRating,
                          }),
                          Object(j.jsx)("button", {
                            className:
                              "cursor-pointer focus:outline-none w-7 flex items-center justify-center " +
                              ("normal" === this.state.status
                                ? "hover:text-green-500 text-2xl"
                                : "hover:text-red-500 text-xl"),
                            onClick: this.handleSectionChange,
                            children: this.state.active,
                          }),
                        ],
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        J = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).state = {
                currentClass: "",
                hubs: [],
                sections: [],
              }),
              (n.removeClassFromStack = n.removeClassFromStack.bind(
                Object(p.a)(n)
              )),
              (n.getHubs = n.getHubs.bind(Object(p.a)(n))),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "getHubs",
                value: function () {
                  var e = this.props.item,
                    t =
                      "?course__college=" +
                      e.college +
                      "&course__department=" +
                      e.department +
                      "&course__number=" +
                      e.number;
                  O.a.get("http://localhost:8000/api/hub/" + t).then(
                    function (e) {
                      var t,
                        s = [],
                        n = Object(H.a)(e.data);
                      try {
                        for (n.s(); !(t = n.n()).done; ) {
                          var a = t.value;
                          s.push(a.buhub.name);
                        }
                      } catch (c) {
                        n.e(c);
                      } finally {
                        n.f();
                      }
                      this.setState({ hubs: s });
                    }.bind(this)
                  );
                },
              },
              {
                key: "getSections",
                value: function () {
                  var e = this.props.item,
                    t =
                      "?course__college=" +
                      e.college +
                      "&course__department=" +
                      e.department +
                      "&course__number=" +
                      e.number;
                  O.a.get("http://localhost:8000/api/" + t).then(
                    function (e) {
                      console.log(e.data), this.setState({ sections: e.data });
                    }.bind(this)
                  );
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  var e = this.props.item;
                  e.title !== this.state.currentClass &&
                    (this.setState({ currentClass: e.title }),
                    this.getHubs(),
                    this.getSections());
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  this.getHubs(), this.getSections();
                  var e = this.props.item;
                  this.setState({ currentClass: e.title });
                },
              },
              {
                key: "removeClassFromStack",
                value: function () {
                  var e = Object(D.a)(this.props.stateCourseStack);
                  e.splice(e.length - 1, 1),
                    this.props.stateDisplayCourse(Object(D.a)(e));
                },
              },
              {
                key: "render",
                value: function () {
                  var e,
                    t = this,
                    s = this.props.item,
                    n = this.state.hubs;
                  return Object(j.jsxs)("div", {
                    className: "w-full h-full",
                    children: [
                      Object(j.jsxs)("div", {
                        class: "p-4",
                        children: [
                          Object(j.jsxs)("button", {
                            className:
                              "flex items-center justify-start text-gray-600 w-full focus:outline-none hover:text-black transition-colors mb-4",
                            onClick: this.removeClassFromStack,
                            children: [
                              Object(j.jsx)(T.a, { className: "mr-2" }),
                              "Back",
                            ],
                          }),
                          Object(j.jsx)("h1", {
                            className: "font-black lg:text-xl xl:text-2xl",
                            children:
                              s.college + " " + s.department + " " + s.number,
                          }),
                          Object(j.jsx)("h2", {
                            className: "text-lg mb-1",
                            children: s.title,
                          }),
                          Object(j.jsxs)("a", {
                            href: "/coursereview",
                            target: "_blank",
                            rel: "noreferrer",
                            className:
                              "text-blue-500 border inline-block border-solid border-blue-500 rounded-full px-3 py-1 bg-blue-100 hover:bg-blue-200 hover:text-blue-600 hover:border-blue-600 transition-colors mt-1 text-sm",
                            children: [
                              Object(j.jsx)("span", {
                                className: "inline align-middle",
                                children: "View on Nexus Course Review",
                              }),
                              Object(j.jsx)(_.a, {
                                className: "inline align-middle ml-1",
                              }),
                            ],
                          }),
                        ],
                      }),
                      Object(j.jsxs)("div", {
                        className:
                          "flex w-full h-full items-start justify-start flex-col overflow-y-scroll",
                        style: { height: "calc(100% - 228px)" },
                        children: [
                          Object(j.jsxs)("div", {
                            className: "text-gray-600 px-4 pb-4",
                            children: [
                              n.length > 0 &&
                                Object(j.jsxs)("div", {
                                  className:
                                    "flex flex-wrap items-center text-sm gap-2",
                                  children: [
                                    Object(j.jsx)("p", {
                                      children: "Hub Areas:",
                                    }),
                                    n.map(function (e, t) {
                                      return Object(j.jsx)(
                                        "div",
                                        {
                                          className:
                                            "bg-gray-200 rounded-full px-3 py-1",
                                          children: e,
                                        },
                                        t
                                      );
                                    }),
                                  ],
                                }),
                              "" !== s.prereqs &&
                                Object(j.jsxs)("div", {
                                  className: "mt-4 text-sm",
                                  children: [
                                    Object(j.jsx)("p", {
                                      className: "inline",
                                      children: "Prerequisites:",
                                    }),
                                    s.prereqs.split(",").map(function (e, n) {
                                      return Object(j.jsxs)(j.Fragment, {
                                        children: [
                                          Object(j.jsx)(
                                            "button",
                                            {
                                              className:
                                                "inline text-blue-500 hover:text-blue-600 transition-colors font-bold ml-1",
                                              onClick: function () {
                                                return t.addClassToStack(e);
                                              },
                                              children: e,
                                            },
                                            n
                                          ),
                                          n < s.prereqs.split(",").length - 1
                                            ? ", "
                                            : "",
                                        ],
                                      });
                                    }),
                                    "; or equivalent.",
                                  ],
                                }),
                              Object(j.jsx)("p", {
                                className: "text-sm mt-4",
                                children:
                                  ((e = s.description),
                                  e.length > 150
                                    ? Object(j.jsxs)(j.Fragment, {
                                        children: [
                                          e.substring(0, 150),
                                          "... ",
                                          Object(j.jsx)("button", {
                                            className:
                                              "text-blue-500 font-bold cursor-pointer hover:text-blue-600 transition-colors inline",
                                            children: "see more",
                                          }),
                                        ],
                                      })
                                    : e),
                              }),
                            ],
                          }),
                          Object(j.jsxs)("div", {
                            className: "flex flex-col w-full",
                            children: [
                              Object(j.jsxs)("div", {
                                className:
                                  "uppercase text-gray-600 font-black flex justify-between w-full px-4",
                                children: [
                                  Object(j.jsx)("span", {
                                    className: "w-1/3",
                                    children: "section",
                                  }),
                                  Object(j.jsx)("div", {
                                    className: "w-1/3",
                                    children: Object(j.jsx)("span", {
                                      children: "prof/work",
                                    }),
                                  }),
                                ],
                              }),
                              Object(j.jsx)("div", {
                                className: "flex flex-col w-full",
                                children: this.state.sections.map(function (
                                  e,
                                  t
                                ) {
                                  return Object(j.jsx)(P, { item: e }, t);
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        U = Object(f.b)(
          function (e) {
            return { classStack: e.classStack };
          },
          function (e) {
            return {
              stateDisplayCourse: function (t) {
                return e(k(t));
              },
            };
          }
        )(J),
        V = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).state = { hasTyped: !1, typedText: "" }),
              (n.handleType = n.handleType.bind(Object(p.a)(n))),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "handleType",
                value: function (e) {
                  this.setState({ typedText: e.target.value }),
                    this.props.stateDisplayCourse([]);
                  var t = e.target.value.split(" ").length,
                    s = e.target.value.toLowerCase().split(" "),
                    n = (function (e, t, s) {
                      return "" === s[0]
                        ? []
                        : 1 === e
                        ? t.filter(function (e) {
                            return (
                              e.college.toLowerCase().includes(s[0]) ||
                              e.department.toLowerCase().includes(s[0]) ||
                              e.number.toLowerCase().includes(s[0])
                            );
                          })
                        : 2 === e
                        ? t.filter(function (e) {
                            return (
                              (e.college.toLowerCase().includes(s[0]) &&
                                e.department.toLowerCase().includes(s[1])) ||
                              (e.department.toLowerCase().includes(s[0]) &&
                                e.number.toLowerCase().includes(s[1]))
                            );
                          })
                        : 3 === e
                        ? t.filter(function (e) {
                            return (
                              e.college.toLowerCase().includes(s[0]) &&
                              e.department.toLowerCase().includes(s[1]) &&
                              e.number.toLowerCase().includes(s[2])
                            );
                          })
                        : [];
                    })(t, this.props.stateCourses, s);
                  this.props.filterClasses(n);
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = this.props.displayedClasses.slice(0, 75),
                    s = this.props.open;
                  return Object(j.jsxs)("div", {
                    className:
                      "bg-white shadow-xl flex flex-col w-full mb-4 overflow-hidden h-full",
                    children: [
                      Object(j.jsx)(L, {
                        handleType: this.handleType,
                        isOpen: s,
                      }),
                      0 === this.props.stateCourseStack.length &&
                        Object(j.jsxs)("div", {
                          className:
                            "flex flex-col w-full items-center justify-center",
                          style: { height: "calc(100% - 55px)" },
                          children: [
                            Object(j.jsxs)("div", {
                              className:
                                "py-2 pl-4 pr-2 flex justify-between uppercase font-bold text-gray-600 text-xs lg:text-sm xl:text-lg w-full",
                              children: [
                                Object(j.jsx)("span", {
                                  className: "w-3/5",
                                  children: "course",
                                }),
                                Object(j.jsx)("div", {
                                  className:
                                    "flex w-2/5 justify-center items-center",
                                  children: Object(j.jsx)("span", {
                                    className: "text-center",
                                    children: "qual/diff",
                                  }),
                                }),
                              ],
                            }),
                            Object(j.jsxs)("div", {
                              className:
                                "flex flex-col flex-grow w-full overflow-y-scroll h-5/6",
                              children: [
                                t.map(function (t, s) {
                                  return Object(j.jsx)(
                                    R,
                                    { item: t, toggleMenu: e.props.toggleMenu },
                                    s
                                  );
                                }),
                                0 === t.length &&
                                  this.state.typedText.length < 1 &&
                                  Object(j.jsx)(M, {}),
                                0 === t.length &&
                                  this.state.typedText.length > 0 &&
                                  Object(j.jsx)(x, {}),
                              ],
                            }),
                          ],
                        }),
                      this.props.stateCourseStack.length > 0 &&
                        Object(j.jsx)(U, {
                          item: this.props.stateCourseStack[
                            this.props.stateCourseStack.length - 1
                          ],
                        }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        G = Object(f.b)(
          function (e) {
            return {
              displayedClasses: e.displayedClasses,
              classes: e.classes,
              classStack: e.classStack,
            };
          },
          function (e) {
            return {
              filterClasses: function (t) {
                return e({ type: g, payload: t });
              },
              stateDisplayCourse: function (t) {
                return e(k(t));
              },
            };
          }
        )(V);
      function Q(e) {
        return 40 - (20 * (1920 - e)) / 1152;
      }
      var K = ["green", "yellow", "red", "blue", "indigo", "purple", "pink"];
      function Y(e) {
        var t,
          s,
          n = K[e.section.id % K.length],
          a =
            e.h +
            ((t = e.section.start),
            (s = e.start),
            ((60 * parseInt(t.substring(0, 2)) +
              parseInt(t.substring(3, 5)) -
              60 * s) /
              60) *
              e.h),
          c =
            (function (e, t) {
              var s =
                60 * parseInt(e.substring(0, 2)) + parseInt(e.substring(3, 5));
              return (
                (60 * parseInt(t.substring(0, 2)) +
                  parseInt(t.substring(3, 5)) -
                  s) /
                60
              );
            })(e.section.start, e.section.end) * e.h;
        return Object(j.jsxs)("div", {
          className:
            "absolute bg-" +
            n +
            "-100 border-l-4 border-" +
            n +
            "-500 text-" +
            n +
            "-500 px-px lg:px-2 w-full flex flex-col items-left justify-center overflow-hidden calendarItem",
          style: { top: a, height: c },
          children: [
            Object(j.jsxs)("div", {
              className: "flex justify-between items-start sectionTitle",
              children: [
                Object(j.jsx)("h3", {
                  className: "font-bold",
                  children: e.section.title,
                }),
                Object(j.jsx)(z.a, { className: "" }),
              ],
            }),
            window.innerWidth > 1024 &&
              Object(j.jsxs)("div", {
                className:
                  "flex items-center justify-start w-full sectionProps",
                children: [
                  Object(j.jsxs)("h4", {
                    className:
                      "flex items-center uppercase whitespace-nowrap left-child",
                    children: [
                      Object(j.jsx)(T.j, { className: "" }),
                      Object(j.jsx)("span", {
                        className: "lg:ml-1 overflow-ellipsis overflow-hidden",
                        children: e.section.professor,
                      }),
                    ],
                  }),
                  Object(j.jsxs)("h4", {
                    className:
                      "flex items-center uppercase whitespace-nowrap right-child",
                    children: [
                      Object(j.jsx)(z.b, { className: "" }),
                      Object(j.jsx)("span", {
                        className: "lg:ml-1 overflow-ellipsis overflow-hidden",
                        children: e.section.location,
                      }),
                    ],
                  }),
                ],
              }),
          ],
        });
      }
      var X = ["monday", "tuesday", "wednesday", "thursday", "friday"],
        Z = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).state = {
                activeSections: [],
                sections: {},
                cellHeight: null,
              }),
              (n.hours = n.hours.bind(Object(p.a)(n))),
              (n.days = n.days.bind(Object(p.a)(n))),
              (n.generateSections = n.generateSections.bind(Object(p.a)(n))),
              (n.calendarStart = 7),
              (n.calendarEnd = 19),
              (n.calendarRef = a.a.createRef()),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "hours",
                value: function () {
                  for (
                    var e = [], t = this.calendarStart;
                    t < this.calendarEnd;
                    t++
                  )
                    e.push(
                      Object(j.jsx)(
                        "div",
                        {
                          className:
                            t === this.calendarEnd - 1
                              ? ""
                              : "border-b border-gray-300 cellAnim",
                          style: { height: this.state.cellHeight + "px" },
                        },
                        t
                      )
                    );
                  return e;
                },
              },
              {
                key: "days",
                value: function () {
                  var e,
                    t = [],
                    s = Object(H.a)(X);
                  try {
                    for (s.s(); !(e = s.n()).done; ) {
                      var n = e.value;
                      t.push(
                        Object(j.jsxs)(
                          "div",
                          {
                            className: "flex flex-col w-full relative",
                            children: [
                              Object(j.jsx)("div", {
                                className:
                                  "uppercase text-gray-600 flex items-center justify-center text-xs lg:text-sm xl:text-base cellAnim",
                                style: { height: this.state.cellHeight + "px" },
                                children:
                                  window.innerWidth > 768
                                    ? n
                                    : n.substring(0, 3),
                              }),
                              Object(j.jsx)("div", {
                                className:
                                  "flex flex-col cellAnim " +
                                  (n === X[0]
                                    ? "border border-gray-300"
                                    : "border border-l-0 border-gray-300"),
                                children: this.hours(),
                              }),
                              this.state.sections[n],
                            ],
                          },
                          n
                        )
                      );
                    }
                  } catch (a) {
                    s.e(a);
                  } finally {
                    s.f();
                  }
                  return t;
                },
              },
              {
                key: "hourLeyend",
                value: function () {
                  for (
                    var e = [], t = this.calendarStart;
                    t <= this.calendarEnd;
                    t++
                  ) {
                    var s = t % 12;
                    t > 12
                      ? (s += " PM")
                      : 12 === t
                      ? (s = "12 PM")
                      : (s += " AM"),
                      e.push(
                        Object(j.jsx)(
                          "div",
                          {
                            className:
                              "w-full flex items-center justify-end text-gray-600 whitespace-nowrap text-xs md:text-md cellAnim",
                            style: { height: this.state.cellHeight + "px" },
                            children: s,
                          },
                          t
                        )
                      );
                  }
                  return e;
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  var e = this;
                  (function (e, t) {
                    if (e.length !== t.length) return !1;
                    for (var s = 0; s < e.length; s++)
                      if (
                        e[s].title !== t[s].title ||
                        e[s].displayed !== t[s].displayed
                      )
                        return !1;
                    return !0;
                  })(
                    this.state.activeSections,
                    this.props.stateVisibleSections
                  ) ||
                    this.setState(
                      {
                        activeSections: JSON.parse(
                          JSON.stringify(this.props.stateVisibleSections)
                        ),
                      },
                      function () {
                        return e.generateSections(e.state.activeSections);
                      }
                    );
                },
              },
              {
                key: "resize",
                value: function () {
                  var e = this;
                  console.log(
                    "Resized window " +
                      window.innerWidth +
                      "x" +
                      window.innerHeight
                  );
                  var t = Q(window.innerWidth);
                  this.setState({ cellHeight: t }, function () {
                    return e.generateSections(e.state.activeSections);
                  });
                },
              },
              {
                key: "componentWillMount",
                value: function () {
                  var e = Q(window.innerWidth);
                  window.addEventListener("resize", this.resize.bind(this));
                  var t = JSON.parse(
                    JSON.stringify(this.props.stateVisibleSections)
                  );
                  this.setState({ cellHeight: e }), this.generateSections(t);
                },
              },
              {
                key: "generateSections",
                value: function (e) {
                  var t = this,
                    s = {
                      monday: [],
                      tuesday: [],
                      wednesday: [],
                      thursday: [],
                      friday: [],
                    };
                  e.map(function (e) {
                    return !1 !== e.displayed
                      ? e.days.map(function (n) {
                          return s[n].push(
                            Object(j.jsx)(
                              Y,
                              {
                                section: e,
                                h: t.state.cellHeight,
                                start: t.calendarStart,
                              },
                              e.id
                            )
                          );
                        })
                      : void 0;
                  }),
                    this.setState({ sections: s });
                },
              },
              {
                key: "render",
                value: function () {
                  return Object(j.jsx)("div", {
                    className: "flex w-full",
                    children: Object(j.jsxs)("div", {
                      className: "flex w-full h-full overflow-hidden",
                      children: [
                        Object(j.jsx)("div", {
                          className:
                            "flex flex-col w-1/12 mr-1 text-xs xl:mt-0 xl:text-sm cellAnim",
                          style: {
                            marginTop: this.state.cellHeight / 2 + "px",
                          },
                          children: this.hourLeyend(),
                        }),
                        Object(j.jsx)("div", {
                          className: "flex w-11/12 h-full cellAnim",
                          ref: this.calendarRef,
                          children: this.days(),
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        $ = Object(f.b)(function (e) {
          return { calendars: e.calendars, activeSections: e.activeSections };
        })(Z),
        ee = s(34);
      function te(e) {
        var t,
          s,
          n =
            ((t = e.val),
            "course quality" === (s = e.text) || "instructor quality" === s
              ? t < 5 / 3
                ? ["#EF4444", "#FECACA"]
                : t < 10 / 3
                ? ["#FBBF24", "#FDE68A"]
                : ["#34D399", "#A7F3D0"]
              : t < 5 / 3
              ? ["#34D399", "#A7F3D0"]
              : t < 10 / 3
              ? ["#FBBF24", "#FDE68A"]
              : ["#EF4444", "#FECACA"]);
        return Object(j.jsxs)("div", {
          className: "flex items-center m-1 xl:m-4",
          children: [
            Object(j.jsx)("div", {
              className: "w-8 xl:w-12 h-8 xl:h-12 mr-2 xl:mr-3 text-center",
              children: Object(j.jsx)(ee.a, {
                value: e.val,
                maxValue: 5,
                className: "flex items-center justify-center",
                strokeWidth: "12",
                styles: Object(ee.b)({
                  rotation: 0,
                  strokeLinecap: "butt",
                  textSize: "2.5rem",
                  pathTransitionDuration: 0.5,
                  pathColor: n[0],
                  textColor: n[0],
                  trailColor: n[1],
                  backgroundColor: "#3e98c7",
                }),
                children: Object(j.jsx)("div", {
                  className:
                    "flex w-full h-full items-center justify-center font-bold text-sm xl:text-lg",
                  children: e.val,
                }),
              }),
            }),
            Object(j.jsx)("h3", {
              className: "uppercase w-20 font-medium text-xs xl:text-base",
              children: e.text,
            }),
          ],
        });
      }
      function se(e) {
        return Object(j.jsxs)("div", {
          className: "w-full h-1/5 flex overflow-hidden",
          children: [
            Object(j.jsxs)("div", {
              className: "flex flex-col w-1/2 items-center justify-center",
              children: [
                Object(j.jsxs)("div", {
                  className: "flex justify-center items-center",
                  children: [
                    Object(j.jsx)(te, {
                      text: "course quality",
                      val: e.stats.quality,
                    }),
                    Object(j.jsx)(te, {
                      text: "instructor quality",
                      val: e.stats.instructor,
                    }),
                  ],
                }),
                Object(j.jsxs)("div", {
                  className: "flex justify-center items-center",
                  children: [
                    Object(j.jsx)(te, {
                      text: "course difficulty",
                      val: e.stats.difficulty,
                    }),
                    Object(j.jsx)(te, {
                      text: "average workload",
                      val: e.stats.workload,
                    }),
                  ],
                }),
              ],
            }),
            Object(j.jsxs)("div", {
              className: "flex items-center justify-center w-1/2",
              children: [
                Object(j.jsxs)("div", {
                  className:
                    "flex flex-col w-3/5 justify-evenly text-xs xl:text-base whitespace-nowrap",
                  children: [
                    Object(j.jsxs)("p", {
                      className: "uppercase",
                      children: [
                        Object(j.jsx)("span", {
                          className: "font-bold w-7 text-right inline-block",
                          children: e.stats.majorClasses,
                        }),
                        " ",
                        "major classes",
                      ],
                    }),
                    Object(j.jsxs)("p", {
                      className: "uppercase",
                      children: [
                        Object(j.jsx)("span", {
                          className: "font-bold w-7 text-right inline-block",
                          children: e.stats.hubClasses,
                        }),
                        " ",
                        "hub classes",
                      ],
                    }),
                    Object(j.jsxs)("p", {
                      className: "uppercase",
                      children: [
                        Object(j.jsx)("span", {
                          className: "font-bold w-7 text-right inline-block",
                          children: e.stats.newHubs,
                        }),
                        " ",
                        "new hub units",
                      ],
                    }),
                    Object(j.jsxs)("p", {
                      className: "uppercase",
                      children: [
                        Object(j.jsx)("span", {
                          className: "font-bold w-7 text-right inline-block",
                          children: e.stats.hoursDay,
                        }),
                        " ",
                        "average hours/day",
                      ],
                    }),
                    Object(j.jsxs)("p", {
                      className: "uppercase",
                      children: [
                        Object(j.jsx)("span", {
                          className: "font-bold w-7 text-right inline-block",
                          children: e.stats.hoursWeek,
                        }),
                        " ",
                        "total hours/week",
                      ],
                    }),
                  ],
                }),
                Object(j.jsxs)("div", {
                  className:
                    "flex flex-col justify-between w-2/5 text-xs xl:text-base h-full py-1 xl:py-4",
                  children: [
                    Object(j.jsxs)("div", {
                      className: "flex flex-col",
                      children: [
                        Object(j.jsx)("h3", {
                          className: "uppercase",
                          children: "earliest start",
                        }),
                        Object(j.jsx)("span", {
                          className: "font-bold",
                          children: e.stats.earliest,
                        }),
                      ],
                    }),
                    Object(j.jsxs)("div", {
                      className: "flex flex-col",
                      children: [
                        Object(j.jsx)("h3", {
                          className: "uppercase",
                          children: "latest end",
                        }),
                        Object(j.jsx)("span", {
                          className: "font-bold",
                          children: e.stats.latest,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      var ne = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).scheduleDrop = a.a.createRef()),
              (n.stateSetSchedule = n.stateSetSchedule.bind(Object(p.a)(n))),
              (n.handleClick = n.handleClick.bind(Object(p.a)(n))),
              (n.state = { open: !1 }),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "stateSetSchedule",
                value: function (e) {
                  var t,
                    s = e.target.value,
                    n = Object(H.a)(this.props.stateSchedules);
                  try {
                    for (n.s(); !(t = n.n()).done; ) {
                      var a = t.value;
                      a.title.toLowerCase() === s.toLowerCase() &&
                        this.props.stateSetSchedule(a);
                    }
                  } catch (c) {
                    n.e(c);
                  } finally {
                    n.f();
                  }
                },
              },
              {
                key: "handleClick",
                value: function (e) {
                  this.state.open &&
                    this.scheduleDrop &&
                    !this.scheduleDrop.current.contains(e.target) &&
                    this.setState({ open: !1 });
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  window.addEventListener("click", this.handleClick.bind(this));
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(j.jsxs)("div", {
                    className:
                      "ml-5 relative bg-gray-200 text-gray-600 rounded-full flex items-center capitalize cursor-pointer select-none font-bold",
                    ref: this.scheduleDrop,
                    children: [
                      Object(j.jsxs)("div", {
                        className: "flex px-4 py-0.5 items-center w-full",
                        onClick: function () {
                          return e.setState({ open: !e.state.open });
                        },
                        children: [
                          this.props.stateActiveSchedule.title,
                          this.state.open
                            ? Object(j.jsx)(T.c, { className: "ml-2" })
                            : Object(j.jsx)(T.b, { className: "ml-2" }),
                        ],
                      }),
                      Object(j.jsx)("div", {
                        className:
                          "absolute top-full mt-3 left-0 shadow-2xl rounded-lg flex flex-col w-64 overflow-hidden z-30 border transition-opacity " +
                          (this.state.open
                            ? "opacity-100"
                            : "invisible opacity-0"),
                        children: this.props.stateSchedules.map(function (
                          t,
                          s
                        ) {
                          var n = t.title === e.props.stateActiveSchedule.title;
                          return Object(j.jsxs)(
                            "div",
                            {
                              className:
                                "px-3 py-4 hover:bg-blue-100 flex items-center justify-between " +
                                (n ? "bg-blue-100" : "bg-white"),
                              onClick: function () {
                                e.props.stateSetSchedule(t);
                              },
                              children: [
                                Object(j.jsxs)("div", {
                                  className: "flex items-center w-2/3",
                                  children: [
                                    Object(j.jsx)(_.b, {}),
                                    Object(j.jsx)("span", {
                                      className:
                                        "ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap",
                                      children: t.title,
                                    }),
                                  ],
                                }),
                                Object(j.jsxs)("div", {
                                  className: "flex text-gray-500 text-sm",
                                  children: [
                                    Object(j.jsx)(T.e, {
                                      className: "hover:text-gray-400",
                                    }),
                                    Object(j.jsx)(T.d, {
                                      className: "mx-1 hover:text-gray-400",
                                    }),
                                    Object(j.jsx)(T.i, {
                                      className: "hover:text-gray-400",
                                    }),
                                  ],
                                }),
                              ],
                            },
                            s
                          );
                        }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        ae = Object(f.b)(
          function (e) {
            return {
              stateActiveSchedule: e.activeCalendar,
              calendars: e.calendars,
            };
          },
          function (e) {
            return {
              stateSetSchedule: function (t) {
                return e(A(t));
              },
            };
          }
        )(ne),
        ce = {
          quality: "3.0",
          instructor: "4.0",
          difficulty: "2.0",
          workload: 4.5,
          majorClasses: 2,
          hubClasses: 2,
          newHubs: 3,
          hoursDay: 1.7,
          hoursWeek: 8.5,
          earliest: "8:00 AM",
          latest: "4:00 PM",
        },
        le = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s() {
            return Object(o.a)(this, s), t.apply(this, arguments);
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(j.jsx)(j.Fragment, {
                    children:
                      this.props.stateActiveSchedule &&
                      Object(j.jsxs)("div", {
                        className:
                          "w-3/4 2xl:w-4/5 h-full bg-white p-4 flex flex-col items-center justify-between",
                        children: [
                          Object(j.jsxs)("div", {
                            className: "w-full flex flex-col items-center",
                            children: [
                              Object(j.jsxs)("div", {
                                className:
                                  "flex w-full items-center justify-start mb-3",
                                children: [
                                  Object(j.jsx)("h1", {
                                    className: "font-bold text-2xl uppercase",
                                    children: "Schedule",
                                  }),
                                  Object(j.jsx)(ae, {}),
                                ],
                              }),
                              Object(j.jsx)($, {}),
                            ],
                          }),
                          Object(j.jsx)(se, { stats: ce }),
                        ],
                      }),
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        re = Object(f.b)(function (e) {
          return { stateActiveSchedule: e.activeCalendar };
        })(le),
        ie = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s() {
            return Object(o.a)(this, s), t.apply(this, arguments);
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  var e = this.props.open;
                  return Object(j.jsxs)("div", {
                    className:
                      "bg-white shadow-xl flex flex-col w-full overflow-hidden justify-center transition-all " +
                      (e ? "h-2/3" : "h-16"),
                    children: [
                      Object(j.jsxs)("div", {
                        className:
                          "bg-white p-4 flex uppercase font-bold flex justify-between items-center",
                        children: [
                          Object(j.jsx)("span", {
                            className:
                              "font-bold text-sm lg:text-lg xl:text-2xl mr-1",
                            children: "recommended",
                          }),
                          Object(j.jsx)("button", {
                            className:
                              "bg-gray-600 text-white text-xs lg:text-sm px-1 lg:px-2 rounded-full focus:outline-none py-1 font-bold mr-1",
                            onClick: this.props.toggleMenu,
                            children: e
                              ? Object(j.jsxs)("div", {
                                  className:
                                    "flex items-center justify-center uppercase",
                                  children: [
                                    window.innerWidth > 1024 && "hide ",
                                    Object(j.jsx)(T.b, {}),
                                  ],
                                })
                              : Object(j.jsxs)("div", {
                                  className:
                                    "flex items-center justify-center uppercase",
                                  children: [
                                    window.innerWidth > 1024 && "show ",
                                    Object(j.jsx)(T.c, {}),
                                  ],
                                }),
                          }),
                        ],
                      }),
                      e &&
                        Object(j.jsxs)(j.Fragment, {
                          children: [
                            Object(j.jsxs)("div", {
                              className:
                                "p-2 pt-0 pl-4 flex uppercase font-bold text-gray-600 text-xs lg:text-sm xl:text-lg",
                              children: [
                                Object(j.jsx)("p", {
                                  className: "w-3/5",
                                  children: "course",
                                }),
                                Object(j.jsx)("p", {
                                  className: "w-1/5 text-center",
                                  children: "qual",
                                }),
                                Object(j.jsx)("p", {
                                  className: "w-1/5 text-center",
                                  children: "diff",
                                }),
                              ],
                            }),
                            Object(j.jsxs)("div", {
                              className: "overflow-y-scroll h-full w-full",
                              children: [
                                Object(j.jsx)(R, {
                                  item: {
                                    title: "Test recommended",
                                    department: "CS",
                                    college: "CAS",
                                    number: "123",
                                  },
                                  toggleMenu: this.props.toggleMenu,
                                }),
                                Object(j.jsx)(R, {
                                  item: {
                                    title: "Test recommended",
                                    department: "CS",
                                    college: "CAS",
                                    number: "123",
                                  },
                                  toggleMenu: this.props.toggleMenu,
                                }),
                                Object(j.jsx)(R, {
                                  item: {
                                    title: "Test recommended",
                                    department: "CS",
                                    college: "CAS",
                                    number: "123",
                                  },
                                  toggleMenu: this.props.toggleMenu,
                                }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component);
      s(76);
      function oe(e) {
        var t,
          s = "",
          n = Object(H.a)(e);
        try {
          for (n.s(); !(t = n.n()).done; ) {
            var a = t.value;
            "thursday" === a.toLowerCase() ? (s += "r") : (s += a.charAt(0));
          }
        } catch (c) {
          n.e(c);
        } finally {
          n.f();
        }
        return s.toUpperCase();
      }
      var de = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s() {
            var e;
            Object(o.a)(this, s);
            for (var n = arguments.length, a = new Array(n), c = 0; c < n; c++)
              a[c] = arguments[c];
            return (
              ((e = t.call.apply(t, [this].concat(a))).state = {
                checked: !0,
                hovered: !1,
                screenW: window.innerWidth,
              }),
              e
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "componentDidUpdate",
                value: function (e) {
                  e.item !== this.props.item &&
                    this.setState({
                      checked: !(!1 === this.props.item.displayed),
                    });
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  this.setState({
                    checked: !(!1 === this.props.item.displayed),
                  }),
                    window.addEventListener(
                      "resize",
                      function () {
                        this.setState({ screenW: window.innerWidth });
                      }.bind(this)
                    );
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(j.jsxs)("div", {
                    className:
                      "w-full h-26 flex items-center justify-between px-2 lg:px-4 py-5 border-b border-solid border-gray-400 cursor-pointer hover:bg-blue-200 transition-colors select-none",
                    onClick: function () {
                      e.props.updateCart(e.props.item.title, e.props.item),
                        e.setState({ checked: !e.state.checked });
                    },
                    onMouseEnter: function () {
                      return e.setState({ hovered: !0 });
                    },
                    onMouseLeave: function () {
                      return e.setState({ hovered: !1 });
                    },
                    children: [
                      Object(j.jsxs)("div", {
                        className: "flex items-center w-full",
                        children: [
                          this.state.checked
                            ? Object(j.jsx)(E.a, {
                                className: "text-xl text-blue-500",
                                style: {
                                  minWidth: Math.max(
                                    this.state.screenW / 80,
                                    10
                                  ),
                                  width: Math.max(this.state.screenW / 80, 10),
                                },
                              })
                            : Object(j.jsx)(E.b, {
                                className: "text-xl text-blue-500",
                                style: {
                                  minWidth: Math.max(
                                    this.state.screenW / 80,
                                    10
                                  ),
                                  width: Math.max(this.state.screenW / 80, 10),
                                },
                              }),
                          Object(j.jsxs)("div", {
                            className: "flex flex-col justify-center ml-2",
                            children: [
                              Object(j.jsx)("span", {
                                className:
                                  "font-bold text-xs md:text-sm lg:text-base whitespace-nowrap",
                                children: this.props.item.title,
                              }),
                              Object(j.jsxs)("div", {
                                className: "flex items-center text-sm",
                                children: [
                                  Object(j.jsx)("span", {
                                    className:
                                      "font-bold mr-1 text-xs lg:text-sm",
                                    children: oe(this.props.item.days),
                                  }),
                                  Object(j.jsxs)("span", {
                                    className:
                                      "text-xs lg:text-sm whitespace-nowrap",
                                    children: [
                                      this.props.item.start,
                                      "-",
                                      this.props.item.end,
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      Object(j.jsx)(T.i, {
                        className:
                          "text-xl text-gray-400 hover:text-red-500 transition " +
                          (this.state.hovered ? "opacity-100" : "opacity-0"),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        ue = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).updateCart = n.updateCart.bind(
                Object(p.a)(n)
              )),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "updateCart",
                value: function (e) {
                  for (
                    var t, s = Object(D.a)(this.props.stateSchedules), n = 0;
                    n < s.length;
                    n++
                  )
                    s[n] === this.props.stateActiveSchedule && (t = n);
                  for (var a = 0; a < s[t].sections.length; a++)
                    if (s[t].sections[a].title === e) {
                      var c = s[t].sections[a].displayed;
                      s[t].sections[a].displayed =
                        "undefined" !== typeof c && !c;
                    }
                  this.props.saveCalendars(s),
                    this.props.stateSetSchedule(s[t]);
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(j.jsx)("div", {
                    className:
                      "w-1/4 2xl:w-1/5 h-full bg-blue-100 flex flex-col",
                    children:
                      this.props.stateActiveSchedule.sections &&
                      this.props.stateActiveSchedule.sections.map(function (
                        t,
                        s
                      ) {
                        return Object(j.jsx)(
                          de,
                          { item: t, updateCart: e.updateCart },
                          s
                        );
                      }),
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        he = Object(f.b)(
          function (e) {
            return {
              activeSections: e.activeSections,
              stateActiveSchedule: e.activeCalendar,
              calendars: e.calendars,
            };
          },
          function (e) {
            return {
              saveCalendars: function (t) {
                return e(S(t));
              },
              stateSetSchedule: function (t) {
                return e(A(t));
              },
            };
          }
        )(ue),
        je = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).state = { recommendedOpen: !0 }),
              (n.toggleMenu = n.toggleMenu.bind(Object(p.a)(n))),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "toggleMenu",
                value: function (e, t) {
                  "undefined" !== typeof t
                    ? this.setState({ recommendedOpen: t })
                    : this.setState({
                        recommendedOpen: !this.state.recommendedOpen,
                      });
                },
              },
              {
                key: "componentWillMount",
                value: function () {
                  var e = this;
                  O.a
                    .get("http://localhost:8000/api/classes/")
                    .then(function (t) {
                      e.props.stateSaveCourses(t.data);
                    }),
                    O.a
                      .get("http://localhost:8000/api/calendars/")
                      .then(function (t) {
                        e.props.saveCalendars(t.data),
                          e.props.stateSetSchedule(t.data[0]),
                          e.props.saveSections(t.data[0].sections);
                      });
                },
              },
              {
                key: "render",
                value: function () {
                  return Object(j.jsx)("div", {
                    className:
                      "flex justify-center items-center h-full bg-blue-300 p-4",
                    style: { paddingTop: 72 },
                    children: Object(j.jsxs)("div", {
                      className:
                        "flex justify-center items-center h-full w-full",
                      children: [
                        Object(j.jsxs)("div", {
                          className:
                            "flex flex-col w-1/4 2xl:w-1/5 h-full overflow-hidden",
                          children: [
                            Object(j.jsx)(G, {
                              open: this.state.recommendedOpen,
                              toggleMenu: this.toggleMenu,
                            }),
                            Object(j.jsx)(ie, {
                              open: this.state.recommendedOpen,
                              toggleMenu: this.toggleMenu,
                            }),
                          ],
                        }),
                        Object(j.jsxs)("div", {
                          className:
                            "shadow-xl w-3/4 2xl:w-4/5 ml-4 h-full flex",
                          children: [
                            Object(j.jsx)(re, {}),
                            Object(j.jsx)(he, {}),
                          ],
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        be = Object(f.b)(null, function (e) {
          return {
            stateSaveCourses: function (t) {
              return e({ type: v, payload: t });
            },
            saveCalendars: function (t) {
              return e(S(t));
            },
            stateSetSchedule: function (t) {
              return e(A(t));
            },
            saveSections: function (t) {
              return e({ type: N, payload: t });
            },
          };
        })(je),
        xe = function () {
          return Object(j.jsx)("div", {
            className: "flex flex-col h-full w-full",
            children: Object(j.jsxs)(i.c, {
              children: [
                Object(j.jsx)(i.a, {
                  exact: !0,
                  path: "/planner",
                  children: Object(j.jsx)(be, {}),
                }),
                Object(j.jsx)(i.a, { children: Object(j.jsx)(x, {}) }),
              ],
            }),
          });
        },
        pe = s(27),
        fe = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s() {
            return Object(o.a)(this, s), t.apply(this, arguments);
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  var e;
                  return Object(j.jsxs)(
                    "div",
                    ((e = { className: "p-6" }),
                    Object(pe.a)(
                      e,
                      "className",
                      "w-full border border-gray-300 rounded-sm flex h-12 focus-within:border-blue-300"
                    ),
                    Object(pe.a)(e, "children", [
                      Object(j.jsx)("input", {
                        type: "search",
                        className: "w-full focus:outline-none h-full px-4",
                        placeholder:
                          "Search for a professor, course, section...",
                        onFocus: function (e) {
                          return (e.target.placeholder = "");
                        },
                        onBlur: function (e) {
                          return (e.target.placeholder =
                            "Search for a professor, course, section...");
                        },
                        onChange: this.props.searchAction,
                      }),
                      Object(j.jsx)("button", {
                        type: "submit",
                        className: "px-4 bg-blue-200 border-l border-gray-300",
                        children: Object(j.jsx)(T.h, {}),
                      }),
                    ]),
                    e)
                  );
                },
              },
            ]),
            s
          );
        })(n.Component),
        me = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            return Object(o.a)(this, s), t.call(this, e);
          }
          return (
            Object(d.a)(s, [
              { key: "makeRequest", value: function (e, t) {} },
              {
                key: "searchAction",
                value: function (e) {
                  console.log(
                    e.target.value.replace(/\s/g, "") +
                      " - " +
                      (function (e) {
                        var t = (e = e.replace(/\s/g, "").toLowerCase()).length,
                          s = new RegExp(/\b[a-z]{5}[0-9]{3}[a-z]/),
                          n = new RegExp(/\b[a-z]{5}[0-9]+/),
                          a = new RegExp(/[a-z]{2}/),
                          c = new RegExp(/[a-z]{2}[0-9]{3}[a-z]/),
                          l = new RegExp(/[a-z]{3}/),
                          r = new RegExp(/[a-z]*/);
                        return n.test(e) && t <= 8
                          ? ["course1"]
                          : s.test(e) && t <= 10
                          ? ["section1"]
                          : a.test(e) && t <= 5
                          ? ["course2"]
                          : c.test(e) && t <= 7
                          ? ["section2"]
                          : l.test(e) && t <= 6
                          ? ["course3"]
                          : r.test(e)
                          ? ["professor1"]
                          : [];
                      })(e.target.value)
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  return Object(j.jsxs)("div", {
                    className:
                      "w-full md:w-2/3 xl:w-1/2 bg-white h-full shadow-2xl px-7",
                    style: { paddingTop: 72 },
                    children: [
                      Object(j.jsx)("h1", {
                        className: "font-bold text-xl mt-3",
                        children: "Welcome to our Reviews & Info section",
                      }),
                      Object(j.jsx)("h2", {
                        className: "text-gray-700 mt-3 mb-8",
                        children:
                          "Here you can easily search for all the information relevant to Boston University students about classes, professors, sections, etc. Start by searching something in the search bar below!",
                      }),
                      Object(j.jsx)(fe, { searchAction: this.searchAction }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        Oe = function () {
          return Object(j.jsx)("div", {
            className:
              "flex flex-col h-full w-full items-center justify-center",
            children: Object(j.jsxs)(i.c, {
              children: [
                Object(j.jsx)(i.a, {
                  exact: !0,
                  path: "/coursesearch",
                  children: Object(j.jsx)(me, {}),
                }),
                Object(j.jsx)(i.a, { children: Object(j.jsx)(x, {}) }),
              ],
            }),
          });
        },
        ve = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return Object(o.a)(this, s), ((n = t.call(this, e)).state = {}), n;
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(j.jsx)("div", {
                    className: "flex w-full h-full justify-center items-center",
                    children: Object(j.jsxs)("div", {
                      className: "text-5xl w-1/2 text-center leading-relaxed",
                      children: [
                        "Whoops! We couldn't find what you were looking for.",
                        " ",
                        Object(j.jsx)("a", {
                          className: "text-blue-500 hover:underline",
                          href: "/",
                          children: "Go back!",
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(n.Component);
      function ge(e) {
        return Object(j.jsxs)("div", {
          className:
            "overflow-hidden flex flex-col items-center justify-center w-full sm:w-1/3 md:w-1/4 m-4",
          children: [
            Object(j.jsx)("img", {
              className: "rounded-full w-40",
              src: e.img,
              alt: "team-member",
            }),
            Object(j.jsx)("a", {
              href: e.linkedin,
              className: "text-xl mt-3 hover:text-blue-500",
              target: "_blank",
              rel: "noreferrer",
              children: e.name,
            }),
            Object(j.jsx)("h4", {
              className: "text-gray-600 text-sm leading-none",
              children: e.position,
            }),
          ],
        });
      }
      var ye = s.p + "static/media/phillip.00e93841.jpg",
        we = s.p + "static/media/daniel.f9f0e7d0.jpg",
        Ne = s.p + "static/media/vineet.ea6d644f.jpeg",
        Ce = s.p + "static/media/user.1a8b3e18.png",
        ke = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s() {
            return Object(o.a)(this, s), t.apply(this, arguments);
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(j.jsx)("div", {
                    className:
                      "w-full h-full bg-blue-300 flex flex-col items-center justify-center",
                    style: { paddingTop: 72 },
                    children: Object(j.jsxs)("div", {
                      className:
                        "flex flex-col items-center w-11/12 lg:w-2/3 xl:1/2 h-full bg-white shadow-xl py-8",
                      children: [
                        Object(j.jsx)("h2", {
                          className: "mb-3 text-4xl font-sans font-bold",
                          children: "Our team",
                        }),
                        Object(j.jsxs)("div", {
                          className:
                            "flex flex-wrap items-center justify-center",
                          children: [
                            Object(j.jsx)(ge, {
                              name: "Daniel Melchor",
                              position: "Full Stack Developer",
                              img: we,
                              linkedin:
                                "https://www.linkedin.com/in/dannymelchor",
                            }),
                            Object(j.jsx)(ge, {
                              name: "Vineet Raju",
                              position: "Back-end Developer",
                              img: Ne,
                              linkedin:
                                "https://www.linkedin.com/in/vineet-raju/",
                            }),
                            Object(j.jsx)(ge, {
                              name: "Phillip Tran",
                              position: "Full Stack Developer",
                              img: ye,
                              linkedin: "https://www.linkedin.com/in/ptrandev/",
                            }),
                            Object(j.jsx)(ge, {
                              name: "Nic Nguyen",
                              position: "Back-end Developer",
                              img: Ce,
                              linkedin: "",
                            }),
                            Object(j.jsx)(ge, {
                              name: "Yuchen C",
                              position: "Lead Designer",
                              img: Ce,
                              linkedin: "",
                            }),
                          ],
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(n.Component),
        Se = (function (e) {
          Object(u.a)(s, e);
          var t = Object(h.a)(s);
          function s(e) {
            var n;
            return (
              Object(o.a)(this, s),
              ((n = t.call(this, e)).state = { menuOpen: !1 }),
              n
            );
          }
          return (
            Object(d.a)(s, [
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(j.jsx)("div", {
                    className:
                      "w-full py-2 flex justify-center items-center bg-white shadow-xl absolute",
                    children: Object(j.jsxs)("div", {
                      className:
                        "w-full px-4 flex justify-between items-center",
                      children: [
                        Object(j.jsx)("div", {
                          className: "font-bold text-xl",
                          children: Object(j.jsx)("a", {
                            href: "/",
                            children: "BUNexus",
                          }),
                        }),
                        Object(j.jsxs)("div", {
                          className: "flex items-center",
                          children: [
                            Object(j.jsx)(r.c, {
                              exact: !0,
                              to: "/planner",
                              activeClassName: "font-bold",
                              className: "uppercase hover:underline mx-2",
                              children: "Planner",
                            }),
                            Object(j.jsx)(r.c, {
                              to: "/coursesearch",
                              activeClassName: "font-bold",
                              className: "uppercase hover:underline mx-2",
                              children: "Reviews & Info",
                            }),
                            Object(j.jsx)(r.c, {
                              to: "/about",
                              activeClassName: "font-bold",
                              className: "uppercase hover:underline mx-2",
                              children: "About",
                            }),
                            Object(j.jsxs)("div", {
                              className: "relative",
                              onMouseEnter: function () {
                                return e.setState({ menuOpen: !0 });
                              },
                              onMouseLeave: function () {
                                return e.setState({ menuOpen: !1 });
                              },
                              children: [
                                Object(j.jsx)("div", {
                                  className:
                                    "w-10 h-10 bg-green-500 rounded-full ml-5",
                                }),
                                this.state.menuOpen &&
                                  Object(j.jsxs)("div", {
                                    className:
                                      "absolute flex flex-col bg-white shadow-xl rounded border border-gray-300 right-0",
                                    children: [
                                      Object(j.jsx)(r.b, {
                                        to: "/planner/login",
                                        className:
                                          "px-4 py-2 hover:bg-gray-200 hover:text-blue-500",
                                        children: "Login",
                                      }),
                                      Object(j.jsx)(r.b, {
                                        to: "/planner/profile",
                                        className:
                                          "px-4 py-2 hover:bg-gray-200 hover:text-blue-500",
                                        children: "Profile",
                                      }),
                                      Object(j.jsx)(r.b, {
                                        to: "/planner/settings",
                                        className:
                                          "px-4 py-2 hover:bg-gray-200 hover:text-blue-500",
                                        children: "Settings",
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(n.Component);
      var Ae = function () {
          return Object(j.jsx)(r.a, {
            children: Object(j.jsxs)("div", {
              className: "w-full h-full",
              children: [
                Object(j.jsx)(Se, {}),
                Object(j.jsxs)(i.c, {
                  children: [
                    Object(j.jsx)(i.a, {
                      exact: !0,
                      path: "/",
                      children: Object(j.jsx)(b, {}),
                    }),
                    Object(j.jsx)(i.a, {
                      path: "/planner",
                      children: Object(j.jsx)(xe, {}),
                    }),
                    Object(j.jsx)(i.a, {
                      path: "/coursesearch",
                      children: Object(j.jsx)(Oe, {}),
                    }),
                    Object(j.jsx)(i.a, {
                      exact: !0,
                      path: "/about",
                      children: Object(j.jsx)(ke, {}),
                    }),
                    Object(j.jsx)(i.a, { children: Object(j.jsx)(ve, {}) }),
                  ],
                }),
              ],
            }),
          });
        },
        Me = function (e) {
          e &&
            e instanceof Function &&
            s
              .e(3)
              .then(s.bind(null, 82))
              .then(function (t) {
                var s = t.getCLS,
                  n = t.getFID,
                  a = t.getFCP,
                  c = t.getLCP,
                  l = t.getTTFB;
                s(e), n(e), a(e), c(e), l(e);
              });
        },
        Te = s(46),
        Ee = s(16),
        Le = {
          classes: [],
          calendars: [],
          displayedClasses: [],
          stateActiveSchedule: {},
          activeSections: [],
          classStack: [],
        },
        De = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : Le,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case v:
              return Object(Ee.a)(
                Object(Ee.a)({}, e),
                {},
                { classes: t.payload }
              );
            case g:
              return Object(Ee.a)(
                Object(Ee.a)({}, e),
                {},
                { displayedClasses: t.payload }
              );
            case w:
              return Object(Ee.a)(
                Object(Ee.a)({}, e),
                {},
                {
                  calendars: t.payload,
                  stateActiveSchedule: t.payload[0],
                  activeSections: t.payload[0].sections,
                }
              );
            case N:
              return Object(Ee.a)(
                Object(Ee.a)({}, e),
                {},
                { activeSections: t.payload }
              );
            case C:
              return Object(Ee.a)(
                Object(Ee.a)({}, e),
                {},
                {
                  stateActiveSchedule: t.payload,
                  activeSections: t.payload.sections,
                }
              );
            case y:
              return Object(Ee.a)(
                Object(Ee.a)({}, e),
                {},
                { classStack: t.payload }
              );
            default:
              return e;
          }
        },
        Fe = Object(Te.a)(De);
      l.a.render(
        Object(j.jsx)(a.a.StrictMode, {
          children: Object(j.jsx)(f.a, {
            store: Fe,
            children: Object(j.jsx)(Ae, {}),
          }),
        }),
        document.getElementById("root")
      ),
        Me();
    },
  },
  [[81, 1, 2]],
]);
//# sourceMappingURL=main.e1714271.chunk.js.map
