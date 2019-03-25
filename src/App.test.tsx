import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';

import createRootReducer from './reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = createBrowserHistory();
  const store = createStore(createRootReducer(history), {}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

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
