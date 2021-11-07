import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/reviews">
            <Reviews />
          </Route>
          <Route exact path="/profile">
            <UserProfile/>
          </Route>
          <Route path="/reviews/:review_id">
            <SingleReview />
          </Route>
          <Route
            path="/front-end-repo"
            component={() => {
              window.location.href = "https://github.com/dkbeale/nc-games";
              return null;
            }}
          />
          <Route
            path="/back-end-repo"
            component={() => {
              window.location.href = "https://github.com/dkbeale/be-nc-games";
              return null;
            }}
          />
          <Route>
            <p className="error_message">Error 404: This Path Does Not Exist</p>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
