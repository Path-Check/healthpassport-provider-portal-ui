import React, { useState, useEffect }  from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AddVaccinationProgram from './components/AddVaccinationProgram'
import API from './API';
import { useHistory } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  let history = useHistory();
  
  const handleLogin = (data) => {
    setUser(data.user);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
    
    history.push("/login");
  }

  const loginStatus = () => {
    API.get('logged_in', {withCredentials: true})    
    .then(response => {
      if (response.data.logged_in) {
        handleLogin(response);
      } else {
        handleLogout();
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  useEffect(() => {
    loginStatus();
  }, []);

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={() => <Home/> }/>
        <Route exact path='/login' component={() => <Login handleLogin={handleLogin} /> }/>
        <Route exact path='/signup' component={() => <Signup handleLogin={handleLogin} /> }/>
        <Route exact path='/vaccination_programs/add' component={AddVaccinationProgram}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
