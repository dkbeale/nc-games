import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Reviews from './components/Reviews';
import SingleReview from './components/SingleReview';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/reviews">
          <Reviews/>
        </Route>
        <Route path="/categories/:category/reviews">
          <Reviews/>
        </Route>
        <Route path="/reviews/:review_id">
          <SingleReview/>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
