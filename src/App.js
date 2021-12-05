import logo from "./logo.svg";
import "./App.css";
import { useReducer, createContext, useEffect, useContext } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Components/screens/Home";
import Login from "./Components/screens/Login";
import Profile from "./Components/screens/Profile";
import Signup from "./Components/screens/Signup";
import CreatePost from "./Components/screens/CreatePost";
import { reducer, initialState } from "./Reducers/userReducer";
import UserProfile from "./Components/screens/UserProfile";
import Subposts from "./Components/screens/Subposts";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push('/')
    } else {
      //   if(!history.location.pathname.startsWith('/reset'))
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowerspost">
        <Subposts />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
