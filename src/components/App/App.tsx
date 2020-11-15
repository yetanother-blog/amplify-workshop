import React, { lazy, Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import { Header } from '../Header/Header';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

import './App.css';

const Home = lazy(() => import('../../routes/Home'));
const CreateRecipe = lazy(() => import('../../routes/CreateRecipe'));
const NotFound = lazy(() => import('../../routes/NotFound'));

export const App = () => {
  return (
    <AmplifyAuthenticator>
      <Router>
        <CssBaseline />
        <Header />
        <Box pt={2} component={Container}>
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={CreateRecipe} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Box>
      </Router>
    </AmplifyAuthenticator>
  );
};