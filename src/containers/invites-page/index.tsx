import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header } from '../header';
import { Invites } from '../../components/invites';
import {
  acceptInvite as acceptInviteWithoutDispatch,
  declineInvite as declineInviteWithoutDispatch,
} from '../../actions';
import { IUser, IState } from '../../interfaces';

import './index.scss';

function InvitesPagePure({
  currentUser,
  isButtonsDisabled,
  acceptInvite,
  declineInvite,
}: {
  currentUser: IUser,
  isButtonsDisabled: boolean,
  acceptInvite: (inviteId: string) => void,
  declineInvite: (inviteId: string) => void,
}) {
  return (
    <main className='games-page-container'>
      <Header />

      {currentUser && <Invites
        currentUser={currentUser}
        isButtonsDisabled={isButtonsDisabled}
        acceptInvite={acceptInvite}
        declineInvite={declineInvite}
      />}
    </main>
  );
}

const mapStateToProps = (state: IState) => ({
  currentUser: state.users.currentUser,
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  acceptInvite: bindActionCreators(acceptInviteWithoutDispatch, dispatch),
  declineInvite: bindActionCreators(declineInviteWithoutDispatch, dispatch),
});

export const InvitesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitesPagePure as ComponentType<any>);
