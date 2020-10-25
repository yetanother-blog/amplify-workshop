import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { Header } from '../Header/Header';
import './App.css';

export const App = () => {
  return (
    <AmplifyAuthenticator>
      <CssBaseline />
      <Header />
    </AmplifyAuthenticator>
  );
};