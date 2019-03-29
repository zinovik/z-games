import React from 'react';
import { number, string } from 'prop-types';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { removeError as removeErrorWithoutDispatch } from '../../actions';

import './index.scss';

function NotificationErrorPure({ id, message, removeError }: {
  id: number,
  message: string,
  removeError: (errorId: number) => void,
}) {

  const handleClose = () => {
    removeError(id);
  };

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <SnackbarContent
        message={message}
        className='notification-error'
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={handleClose}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

NotificationErrorPure.propTypes = {
  id: number.isRequired,
  message: string.isRequired,
};

NotificationErrorPure.defaultProps = {
  id: 0,
  message: '',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeError: bindActionCreators(removeErrorWithoutDispatch, dispatch),
});

export const NotificationError = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationErrorPure);
