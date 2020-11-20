import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  };
  
  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    });
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  }

  loginStatus = () => {
    axios.get('http://localhost:3000/logged_in', {withCredentials: true})    
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  componentDidMount() {
    this.loginStatus();
    console.log("History", this.props.history);
  }

  render() {
    return (
         <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={() => <Login handleLogin={this.handleLogin} /> }/>
            <Route exact path='/signup' component={() => <Signup handleLogin={this.handleLogin} /> }/>
          </Switch>
        </BrowserRouter>
    );
  }
};

export default App;