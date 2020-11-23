import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 
           'https://healthpassport-provider-portal.herokuapp.com'
           : 'http://localhost:3000'
});