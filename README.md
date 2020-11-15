# Amplify for Beginners

## Prerequisites 

In the tutorial, we use [AWS Cloud9](https://aws.amazon.com/cloud9/) to keep the bootstrapping as simple as possible. However, you can also run the project on your local machine. Make sure you have the following stuff in place:

* [AWS Account](https://aws.amazon.com/)
* [NodeJS](https://nodejs.org/en/)
* Editor (e.g. [Visual Studio Code](https://code.visualstudio.com/))
* [Amplify CLI](https://docs.amplify.aws/cli/start/install)

## Step-By-Step Guide

### Setup CRA & Hosting

1. Everything starts with the frontend. Let's boostrap [Create React App](https://reactjs.org/docs/create-a-new-react-app.html): `npx create-react-app amplify-workshop --template typescript`.
2. Run `amplify configure` and set up the credentials.
3. Now we can run `amplify init` to initialize the project. Keep everything as default settings.
4. To deploy our application, we need to set up hosting. Run `amplify hosting add`. Choose the `Hosting with Amplify` option and select `Manual deployment`. Finally, run `amplify publish` to deploy the application for the first time.

### Material UI

This project uses a [Material](https://material.io/) UI library to abstract the overhead of writing low-level React components with CSS. 

1. Follow the [instructions](https://material-ui.com/getting-started/installation/) on the page.
2. Add the [<CssBasline />](https://material-ui.com/components/css-baseline/) component to the `App.tsx` component. We can also just get rid of all the default stuff in the app (like the React logo, the default CSS etc.).
3. Create a Header component (`/components/Header/Header.tsx`) and use the [Simple App Bar](https://material-ui.com/components/app-bar/#simple-app-bar) as a blueprint for the header.
4. Add the Header component to `App.tsx`.
5. Run `amplify publish` to deploy the latest changes.

### Authentication

1. Run `amplify add auth`. Choose default settings, authentication with email, and skip additional steps.
2. Run `amplify push` to provision the backend.
3. Install dependencies to integrate authentication in the frontend: `npm i aws-amplify @aws-amplify/ui-react`.
4. Add the following stuff to the `index.ts`:
  ```typescript
  import Amplify from 'aws-amplify';
  import awsconfig from './aws-exports';
  
  Amplify.configure(awsconfig);
  ```
5. Go to the `App.tsx` and wrap all components, like this: 
  ```typescript
  import React, { lazy, Suspense } from 'react';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
  import { Header } from '../Header/Header';

  export const App = () => {
    return (
      <AmplifyAuthenticator>
        <CssBaseline />
        <Header />
      </AmplifyAuthenticator>
    );
  };
  ```
  What does it do? The `<AmplifyAuthenticator />` component checks if the user has a valid session. If so, it does render our underlying components (right now just the header). If not, it provides an interface to login or sign up.
6. The default interface for the login is already quite cool, but it doesn't match with our colors. We can finetune the look of the login interface. Therefore, we create a `App.css` file and import it in the `App.tsx`. Put the following stuff in the CSS file:
  ```css
  :root {
    --amplify-primary-color: #3f51b5;
    --amplify-primary-tint: #3f51b5;
    --amplify-primary-shade: #3f51b5;
  }

  amplify-authenticator {
    --container-justify: center;
    --container-align: center;
  }
  ```
7. Finally, we want to provide a sign out button in our app. We go to the Header component and extend it like this:
  ```typescript
  import React from 'react';
  import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
  import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
  import { Auth } from 'aws-amplify';

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
      },
    }),
  );

  export const Header = () => {
    const classes = useStyles();

    const signOut = async () => {
      await Auth.signOut();
    };
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Cookbook
            </Typography>
            <Button color="inherit" onClick={signOut}>Sign out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  ```
8. As always, run `amplify publish` to deploy the latest changes.