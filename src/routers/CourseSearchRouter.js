import { Route, Switch } from "react-router";
import NotFound from "../pages/Planner/ClassSection/NotFound";

const CourseSearchRouter = () => {
  return (
    <Switch>
      <Route exact path="/coursesearch"></Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default CourseSearchRouter;
