import * as ActionTypes from '../actions/action-types';
import { IErrorsState } from '../interfaces';

const initialState = {
  errors: [],
};

const errors = (state: IErrorsState = initialState, action: ActionTypes.Action): IErrorsState => {
  switch (action.type) {
    case ActionTypes.ADD_ERROR:
      const errorId = state.errors.length && state.errors[state.errors.length - 1].id + 1;

      return {
        errors: [
          ...state.errors,
          {
            id: errorId,
            message: action.message,
          },
        ],
      };

    case ActionTypes.REMOVE_ERROR:
      return {
        errors: state.errors.filter(error => error.id !== action.errorId),
      };

    default:
      return state;
  }
};

export default errors;
