import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import HomePage from "./components/homePage";
import FuelFormHistory from "./components/fuelFormHistory";
import FuelForm from "./components/fuelForm";
import Navbar from "./components/navbar";
import LoginForm from "./components/LoginForm";
import Register from "./components/register";
import ClientProfilePage from "./components/clientProfile";

function App() {
  const adminUser = { name: "Harry Potter", password: "123456" };
  const [user, setUser] = useState({ name: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  const Login = (details) => {
    console.log(details);
    if (details.message == "True") {
      console.log("Logged in");
      setUser({
        name: details.name,
      });
    } else {
      console.log(details.message);
      setError(details.message);
    }
  };

  const Logout = () => {
    console.log("Logged out");
    setUser({ name: "" });
    history.push("/login");
  };

  return (
    <Router>
      <div>
        {user.name !== "" && <Navbar handleLogout={Logout} />}
        <Switch>
          <Route path="/" exact>
            {user.name !== "" ? <HomePage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile">
            {user.name !== "" ? (
              <>
                <Navbar handleLogout={Logout} />
                <ClientProfilePage />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/fuelForm">
            {user.name !== "" ? (
              <>
                <Navbar handleLogout={Logout} />
                <FuelForm />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/fuelFormHistory">
            {user.name !== "" ? (
              <>
                <Navbar handleLogout={Logout} />
                <FuelFormHistory />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            {user.name !== "" ? (
              <Redirect to="/" />
            ) : (
              <LoginForm Login={Login} error={error} />
            )}
          </Route>
          <Route path="/register" component={Register} />
          <Redirect to="/login" />
        </Switch>
        {user.name !== "" && (
          <button onClick={Logout}>Logout</button> // Logout button
        )}
      </div>
    </Router>
  );
}

export default App;