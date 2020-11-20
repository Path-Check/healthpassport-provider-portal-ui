import React, { useState, useEffect }  from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AddVaccinationProgram from './components/AddVaccinationProgram'
import API from './API';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  
  const handleLogin = (data) => {
    console.log("Logged In");
    setUser(data.user);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    console.log("Logged Out");
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
    })
    .catch(error => console.log('api errors:', error))
  };

  useEffect(() => {
    loginStatus();
  }, []);

  const PublicRoute = ({ isLoggedIn, ...props }) => {
    console.log(isLoggedIn);
    return isLoggedIn
        ? (<Redirect to="/" />)
        : (<Route {...props} />);
  };

  const PrivateRoute = ({ isLoggedIn, ...props }) => {
    console.log(isLoggedIn);
    return !isLoggedIn
        ? (<Redirect to="/login" />)
        : (<Route {...props} />);
  };

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/' component={() => <Home/> }/>
        <Route isLoggedIn={isLoggedIn} exact path='/vaccination_programs/add' component={AddVaccinationProgram}/>

        <PublicRoute isLoggedIn={isLoggedIn} exact path='/login' component={() => <Login handleLogin={handleLogin} /> }/>
        <PublicRoute isLoggedIn={isLoggedIn} exact path='/signup' component={() => <Signup handleLogin={handleLogin} /> }/>
        
      </Switch>
    </BrowserRouter>
  );
};

export default App;
