import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header, Loading } from '../../components';

import './index.scss';

function AboutPagePure({ isConnected }: {
  isConnected: boolean,
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
            Currently, there is only two games: No, Thanks and Perudo. But we are working on it, you can help ;)
          </Typography>
        </div>
      </div>

      <Loading isConnected={isConnected} text='Connecting to the server...' />
    </main>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export const AboutPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutPagePure);
