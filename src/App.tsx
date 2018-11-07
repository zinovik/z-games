import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './containers/home-page';
import GamePage from './containers/game-page';
import './App.css';

class App extends React.Component {

  public render() {
    return (
      <Switch>
        <Route path='/games' component={HomePage} />
        <Route path='/game/:id' component={GamePage} />
        <Redirect from='*' to='/games' />
      </Switch>
    );
  }

}

export default App;
