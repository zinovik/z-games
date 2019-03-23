import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, CssBaseline, colors } from '@material-ui/core';

import App from './App';
import reducers from './reducers';
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

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
));
zGamesApi.setStore(store);

unregister();
render(
  <Router>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
