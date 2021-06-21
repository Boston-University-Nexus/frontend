import "./css/index.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import Landing from "./pages/Landing/Landing";
import PlannerRouter from "./routers/PlannerRouter";
import CourseSearchRouter from "./routers/CourseSearchRouter";
import NotFound from "./pages/NotFound/NotFound";

// Divide in different routers for organized routing
function App() {
  return (
    <Router>
      <div className="w-full h-full">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/planner">
            <PlannerRouter />
          </Route>
          <Route path="/coursesearch">
            <CourseSearchRouter />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
