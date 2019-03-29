import React from 'react';
import { number, string } from 'prop-types';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { removeNotification as removeNotificationWithoutDispatch } from '../../actions';

function NotificationPure({ id, message, removeNotification }: {
  id: number,
  message: string,
  removeNotification: (errorId: number) => void,
}) {

  const handleClose = () => {
    removeNotification(id);
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContent
        message={message}
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

NotificationPure.propTypes = {
  id: number.isRequired,
  message: string.isRequired,
};

NotificationPure.defaultProps = {
  id: 0,
  message: '',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeNotification: bindActionCreators(removeNotificationWithoutDispatch, dispatch),
});

export const Notification = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationPure);
