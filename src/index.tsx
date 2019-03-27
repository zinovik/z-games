import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, CssBaseline, colors } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

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
  typography: {
    useNextVariants: true,
  },
});

const socketService = SocketService.Instance;

const history = createBrowserHistory();

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const enhancers = reduxDevTools ?
  compose(applyMiddleware(routerMiddleware(history), thunk), reduxDevTools()) :
  applyMiddleware(routerMiddleware(history), thunk);

const store = createStore(createRootReducer(history), {}, enhancers);
socketService.provideDispatch(store.dispatch);

unregister();
render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
