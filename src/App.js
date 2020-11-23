import React, { useState, useEffect }  from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SyncLoader from "react-spinners/SyncLoader";
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AddVaccinationProgram from './components/AddVaccinationProgram'
import PrintVaccinationProgram from './components/PrintVaccinationProgram'
import GenerateCertificate from './components/GenerateCertificate'

import API from './API';

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100vh'
  }
});

function App() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedLoggedIn, setCheckedLoggedIn] = useState(false);
  
  const handleLogin = (data) => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (!checkedLoggedIn)
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

  console.log(process.env);

  if (!checkedLoggedIn) {
    return (
      <Container component="main" className={classes.container}>  
        <SyncLoader size={15} color={"#3654DD"} />
      </Container>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/vaccination_programs/add' component={() => <AddVaccinationProgram />}/>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/printVaccination/:id' component={(context) => <PrintVaccinationProgram context={context} />}/>

          <Route exact path='/generateCertificate/:id' component={(context) => <GenerateCertificate context={context} /> }/>
          
          <PublicRoute isLoggedIn={isLoggedIn} exact path='/login' component={() => <Login handleLogin={handleLogin} /> }/>
          <PublicRoute isLoggedIn={isLoggedIn} exact path='/signup' component={() => <Signup handleLogin={handleLogin} /> }/>  

          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/' component={() => <Home/> }/>
          
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
