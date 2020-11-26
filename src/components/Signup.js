import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../API';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  errors: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: '#F00',
    textAlign: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signup({handleLogin}) {
  const classes = useStyles();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [password_confirmation, setPasswordConfirmation] = useState([]);
  const [errors, setErrors] = useState([]);
  
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let user = {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    API.post('users/', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        history.push('/login');
      } else {
        setErrors(response.data.errors);
      }
    })
    .catch(error => setErrors(error.response.data.errors));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>    
       <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {setPassword(event.target.value)}}
          />   
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password Confirmation"
            type="password"
            id="password_confirmation"
            value={password_confirmation}
            onChange={(event) => {setPasswordConfirmation(event.target.value)}}
          />   
           <Typography component="p" className={classes.errors}>
            {errors.join('.\n')}
          </Typography>     
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Signup;