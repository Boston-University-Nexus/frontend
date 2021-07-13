import "./css/index.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Landing from "./pages/Landing/Landing";
import PlannerRouter from "./routers/PlannerRouter";
import CourseSearchRouter from "./routers/CourseSearchRouter";
import LoginRouter from "./routers/LoginRouter";
import SignOutRouter from "./routers/SignOutRouter";
import NotFound from "./pages/NotFound/NotFound";
import About from "./pages/About/About";
import Nav from "./components/Nav";

// Authentication
import AuthGuard from "./components/AuthGuard";

// Divide in different routers for organized routing
function App() {
  return (
    <Router>
      <div className="w-full h-full">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <LoginRouter />
          </Route>
          <Route exact path="/signout">
            <SignOutRouter/>
          </Route>
          <Route exact path="/planner">
            <AuthGuard>
              <PlannerRouter />
            </AuthGuard>
          </Route>
          <Route exact path="/coursesearch">
            <AuthGuard>
              <CourseSearchRouter />
            </AuthGuard>
          </Route>
          <Route exact path="/about">
            <About />
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
