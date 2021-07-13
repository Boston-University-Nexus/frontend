import { Route, Switch } from "react-router";

// Components
import NotFound from "../pages/Planner/ClassSection/NotFound";
import Main from "../pages/Planner/Main";

const PlannerRouter = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <Switch>
        <Route exact path="/planner">
          <Main />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default PlannerRouter;
