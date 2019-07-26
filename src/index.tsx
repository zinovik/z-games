import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
// import registerServiceWorker, { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, CssBaseline, colors } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

import { initializeFirebase, askForPermissionToReceiveNotifications } from './push-notification';
import App from './App';
import createRootReducer from './reducers';
import { SocketService } from './services';

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
});

const socketService = SocketService.Instance;

const history = createBrowserHistory();

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const enhancers = reduxDevTools
  ? compose(
      applyMiddleware(routerMiddleware(history), thunk),
      reduxDevTools(),
    )
  : applyMiddleware(routerMiddleware(history), thunk);

const store = createStore(createRootReducer(history), {}, enhancers);
socketService.provideDispatch(store.dispatch);

// unregister();
render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement,
);
// registerServiceWorker();

(async () => {
  await initializeFirebase();
  const notificationsToken = await askForPermissionToReceiveNotifications();

  const token = localStorage.getItem('token');
  const fetchResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/update`, {
    method: 'POST',
    body: JSON.stringify({ notificationsToken }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (fetchResult.status !== 200) {
    // TODO
    return;
  }
})();
