import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
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
          <Button component={Link} to="/create" color="inherit">New Recipe</Button>
          <Button color="inherit" onClick={signOut}>Sign out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};