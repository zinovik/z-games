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
  acceptInvite,
  declineInvite,
}: {
  currentUser: IUser;
  acceptInvite: (inviteId: string) => void;
  declineInvite: (inviteId: string) => void;
}) {
  return (
    <main className="games-page-container">
      <Header />

      {currentUser && <Invites currentUser={currentUser} acceptInvite={acceptInvite} declineInvite={declineInvite} />}
    </main>
  );
}

const mapStateToProps = (state: IState) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  acceptInvite: bindActionCreators(acceptInviteWithoutDispatch, dispatch),
  declineInvite: bindActionCreators(declineInviteWithoutDispatch, dispatch),
});

export const InvitesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitesPagePure as ComponentType<any>);
