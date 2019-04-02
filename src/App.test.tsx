import React from 'react';
import thunk from 'redux-thunk';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = createBrowserHistory();

  const enhancers = applyMiddleware(routerMiddleware(history), thunk);

  const store = createStore(createRootReducer(history), {}, enhancers);

  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    div
  );
  unmountComponentAtNode(div);
});
