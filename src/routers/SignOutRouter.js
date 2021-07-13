import { Route, Switch } from "react-router";

// Components
import SignOut from "../pages/SignOut/SignOut";

const SignOutRouter = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <Switch>
        <Route exact path="/signout">
          <SignOut/>
        </Route>
      </Switch>
    </div>
  );
};

export default SignOutRouter;
