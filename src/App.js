import "./css/index.scss";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Landing from "./pages/Landing/Landing";
import NotFound from "./pages/NotFound/NotFound";
import About from "./pages/About/About";
import Nav from "./components/Nav";
import Profile from "./pages/Profile/Profile";
import Popups from "./components/Popups/Popups";

import CourseSearchRouter from "./routers/CourseSearchRouter";
import { stateSetLoggedIn } from "./state/actions";
import { request } from "./middlewares/requests";
import { connect } from "react-redux";
import PlannerMain from "./pages/Planner/Main";

// Divide in different routers for organized routing
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  async componentDidMount() {
    // Pinging to check if we are logged in
    const res = await request.get(process.env.REACT_APP_SERVER + "whoami");
    if (!res || res.error) this.props.stateSetLoggedIn(false);
    else this.props.stateSetLoggedIn(true);

    this.setState({ loaded: true });
  }

  render() {
    return (
      <>
        {this.state.loaded && (
          <Router>
            <div className="w-full min-h-screen h-screen flex flex-col">
              <Popups />
              <Nav />
              <Switch>
                <Route exact path="/">
                  <Landing />
                </Route>
                <Route path="/planner">
                  <PlannerMain />
                </Route>
                <Route path="/coursesearch">
                  <CourseSearchRouter />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </Router>
        )}
      </>
    );
  }
}

// Redux
const mapDispatchToProps = (dispatch) => {
  return {
    stateSetLoggedIn: (classes) => dispatch(stateSetLoggedIn(classes)),
  };
};

export default connect(null, mapDispatchToProps)(App);
