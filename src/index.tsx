import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, CssBaseline, colors } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

import App from './App';
import createRootReducer from './reducers';
import { ZGamesApi } from './services';

import './index.scss';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: colors.deepOrange[900],
    },
    secondary: {
      main: colors.lightBlue[900],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const zGamesApi: ZGamesApi = ZGamesApi.Instance;

const history = createBrowserHistory();

const store = createStore(createRootReducer(history), compose(
  applyMiddleware(routerMiddleware(history), thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
));
zGamesApi.setStore(store);

unregister();
render(
  <Router>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
