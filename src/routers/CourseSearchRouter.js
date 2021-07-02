import { Route, Switch } from "react-router";

// Components
import NotFound from "../pages/Planner/ClassSection/NotFound";
import Main from "../pages/CourseSearch/Main.js";

const CourseSearchRouter = () => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <Switch>
        <Route exact path="/coursesearch">
          <Main />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default CourseSearchRouter;
