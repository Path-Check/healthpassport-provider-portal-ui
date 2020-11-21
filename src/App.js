import React, { useState, useEffect }  from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AddVaccinationProgram from './components/AddVaccinationProgram'
import API from './API';
import SyncLoader from "react-spinners/ClipLoader";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles({
  loading: {
    display: 'block',
    margin: 0,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function App() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [checkedLoggedIn, setCheckedLoggedIn] = useState(false);
  
  const handleLogin = (data) => {
    setUser(data.user);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
  }

  const loginStatus = () => {
    API.get('logged_in', {withCredentials: true})    
    .then(response => {
      if (response.data.logged_in) {
        handleLogin(response);
      } else {
        handleLogout();
      }
      setCheckedLoggedIn(true);
    })
    .catch(error => console.log('api errors:', error))
  };

  useEffect(() => {
    if (!checkedLoggedIn)
      loginStatus();
  }, [checkedLoggedIn]);

  const PublicRoute = ({ isLoggedIn, ...props }) => {
    return isLoggedIn
        ? (<Redirect to="/" />)
        : (<Route {...props} />);
  };

  const PrivateRoute = ({ isLoggedIn, ...props }) => {
    return !isLoggedIn
        ? (<Redirect to="/login" />)
        : (<Route {...props} />);
  };

  if (!checkedLoggedIn) {
    return (
      <Container component="main" maxWidth="xs">  
        <CssBaseline />
        <SyncLoader className={classes.loading} size={150} color={"#123abc"} />
      </Container>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/vaccination_programs/add' component={() => <AddVaccinationProgram />}/>

          <PublicRoute isLoggedIn={isLoggedIn} exact path='/login' component={() => <Login handleLogin={handleLogin} /> }/>
          <PublicRoute isLoggedIn={isLoggedIn} exact path='/signup' component={() => <Signup handleLogin={handleLogin} /> }/>  

          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/' component={() => <Home/> }/>
          
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
