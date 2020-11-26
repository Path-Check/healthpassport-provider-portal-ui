import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100vh'
  }
});

export default function LoadingScreen(props) {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.container}>  
      <SyncLoader size={15} color={"#3654DD"} />
    </Container>
  );
}

