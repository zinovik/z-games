import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header } from '../header';
import { refreshToken as refreshTokenWithoutDispatch } from '../../actions';

import './index.scss';

function HomePagePure({
  match: {
    params: { token },
  },
  refreshToken,
}: {
  match: { params: { token: string } };
  refreshToken: (newToken: string) => void;
}) {
  if (token && token.length >= 50) {
    refreshToken(token);
  }

  return (
    <main className="home-page-container">
      <Header />

      <div className="home-page-content">
        <div className="home-page-logo-container">
          <Typography>
            <img className="logo" src="/images/logo.png" alt="logo" />
          </Typography>

          <Typography variant="h5" color="primary">
            a tiny board games portal
          </Typography>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  refreshToken: bindActionCreators(refreshTokenWithoutDispatch, dispatch),
});

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePagePure);
