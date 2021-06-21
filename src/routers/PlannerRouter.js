import { Route, Switch } from "react-router";

// Components
import PlannerNav from "../components/Planner/PlannerNav";
import About from "../pages/About/About";
import NotFound from "../pages/Planner/ClassSection/NotFound";
import Main from "../pages/Planner/Main";

const PlannerRouter = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <PlannerNav />
      <Switch>
        <Route exact path="/planner">
          <Main />
        </Route>
        <Route exact path="/planner/about">
          <About />
        </Route>
        <Route exact path="/planner/profile"></Route>
        <Route exact path="/planner/settings"></Route>
        <Route exact path="/planner/login"></Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default PlannerRouter;
