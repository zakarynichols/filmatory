import React from 'react';
import GetMovies from './components/GetMovies';
import Movie from './components/Movie/Movie';
import Home from './components/Home';

import {
  HashRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <div>
        <ul className="centered nav-links lists">
          <li>
            <NavLink activeClassName="selected" exact={true} to="/">Home</NavLink>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Home />
            <GetMovies />
          </Route>
          <Route path="/:id" children={<Movie />} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;