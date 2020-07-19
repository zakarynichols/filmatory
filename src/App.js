import React from 'react';
import GetMovies from './components/GetMovies';
import Child from './components/Child';
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
          <Route path="/:id" children={<Child />} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;