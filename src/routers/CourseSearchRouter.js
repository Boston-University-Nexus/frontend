import { Route, Switch } from "react-router";

// Components
import NotFound from "../pages/Planner/ClassSection/NotFound";
import Main from "../pages/CourseSearch/Main.js";
import Courses from "../pages/CourseSearch/Courses.js";
import Sections from "../pages/CourseSearch/Sections.js";
import Professors from "../pages/CourseSearch/Professors.js";

const CourseSearchRouter = () => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <Switch>
        <Route exact path="/coursesearch">
          <Main />
        </Route>
        <Route exact path="/coursesearch/courses">
          <Courses />
        </Route>
        <Route exact path="/coursesearch/sections">
          <Sections />
        </Route>
        <Route exact path="/coursesearch/professors">
          <Professors />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default CourseSearchRouter;
