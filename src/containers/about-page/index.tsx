import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header } from '../header';
import { ChangeServer } from '../../components/change-server';
import { updateServerUrl as updateServerUrlDispatch } from '../../actions';
import { IState } from '../../interfaces';

import './index.scss';

function AboutPagePure({ serverUrl, updateServerUrl }: {
  serverUrl: string,
  updateServerUrl: (serverUrl: string) => void,
}) {
  return (
    <main className='about-page-container'>
      <Header />

      <div className='about-page-content'>
        <div className='about-page-data'>
          <Typography variant='h5'>
            Z-Games
          </Typography>

          <Typography>
            Z-Games is a tiny board games portal that is slowly being developed since the warm fall of 2017
          </Typography>

          <Typography>
            Currently, there is only four games: No, Thanks, Perudo, Lost Cities and 6 nimmt!. But we are working on it and you can help ;)
          </Typography>

          <Typography>
            The easiest way is to create issue here: <a href='https://github.com/zinovik/z-games-api/issues#zenhub' className='about-page-link'>
              https://github.com/zinovik/z-games-api/issues#zenhub
            </a>
          </Typography>

          <ChangeServer
            serverUrl={serverUrl}
            updateServerUrl={updateServerUrl}
          />
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state: IState) => ({
  serverUrl: state.users.serverUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateServerUrl: bindActionCreators(updateServerUrlDispatch, dispatch),
});

export const AboutPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutPagePure);
