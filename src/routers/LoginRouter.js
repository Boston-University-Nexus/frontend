import { Route, Switch } from "react-router";

// Components
import Login from "../pages/Login/Login";


const LoginRouter = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
};

export default LoginRouter;
