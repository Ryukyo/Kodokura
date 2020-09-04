import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import LogIn from "./components/LogIn/LogIn";
import FriendList from "./components/FriendList/FriendList";
import BlockList from "./components/BlockList/BlockList";
import AvatarSelector from "./components/AvatarSelector/AvatarSelector";
import Profile from "./components/Profile/Profile";
import { auth } from "./services/firebase";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Questions from "./components/Questions/Questions";
import QuestionCard from './components/Questions/QuestionCard';
import LanguageSelector from './components/Profile/Languages';


function App() {
  const [authentication, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated === true ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
        }
      />
    );
  }

  function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated === false ? (
            <Component {...props} />
          ) : (
              <Redirect to="/home" />
            )
        }
      />
    );
  }

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        setLoading(false);
      } else {
        setAuth(false);
        setLoading(false);
      }
    });
  }, []);

  return loading === true ? (
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <PrivateRoute
            path="/chatroom"
            authenticated={authentication}
            // needs to be "Home" for the real implementation
            component={ChatRoom}
          />
          <PrivateRoute
            path="/home"
            authenticated={authentication}
            component={Home}
          />
          <PrivateRoute
            path="/questions"
            authenticated={authentication}
            component={Questions}
          />
          <PrivateRoute
            path="/questioncard"
            authenticated={authentication}
            component={QuestionCard}
          />
          <PrivateRoute
            path="/profile"
            authenticated={authentication}
            component={Profile}
          />
          <PrivateRoute
            path="/avatar"
            authenticated={authentication}
            component={AvatarSelector}
          />
          <PrivateRoute
            path="/language"
            authenticated={authentication}
            component={LanguageSelector}
          />
          <PublicRoute
            path="/signup"
            authenticated={authentication}
            component={CreateAccount}
          />
          <PublicRoute
            path="/login"
            authenticated={authentication}
            component={LogIn}
          />

        </Switch>
      </Router>
    );
}

export default App;
