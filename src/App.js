import React, { useState, useEffect }  from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AddVaccinationProgram from './components/AddVaccinationProgram'
import PrintVaccinationProgram from './components/PrintVaccinationProgram'
import GenerateCertificate from './components/GenerateCertificate'
import LoadingScreen from './components/LoadingScreen'

import API from './API';

function App() {
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

  if (!checkedLoggedIn) {
    return (<LoadingScreen />);
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
