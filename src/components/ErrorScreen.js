import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SyncLoader from "react-spinners/SyncLoader";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  errormessages : {
    marginTop: theme.spacing(2),
  }
}));

export default function ErrorScreen(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">  
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/logo.png">

        </Avatar>
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>    
        <Typography component="p" className={classes.errormessages}>
          {props.errors.join('. ')}
        </Typography>    
      </div>
    </Container>
  );
}

