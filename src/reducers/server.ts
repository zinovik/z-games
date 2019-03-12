import * as types from '../constants';
import { Action } from '../actions';

const initialState = {
  serverUrl: 'http://localhost:4000',
};

const server = (state: types.ServerState = initialState, action: Action): types.ServerState => {

  switch (action.type) {

    case types.ADD_SERVER_URL:
      return {
        ...state,
        serverUrl: action.serverUrl,
      };

    default:
      return state;

  }

};

export default server;
