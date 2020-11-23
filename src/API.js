import axios from 'axios';

console.log(process.env.NODE_ENV);

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 
           'https://healthpassport-provider-portal.herokuapp.com/'
           : 'http://localhost:3000'
});