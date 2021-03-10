import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../API';

import { useHistory } from 'react-router-dom';

const CapitalizeFirstLetter = (str) => {
  return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str
}

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

function AddVaccinationProgram() {
  const classes = useStyles();
  const [vaccinator, setVaccinator] = useState([]);
  const [brand, setBrand] = useState([]);
  const [product, setProduct] = useState([]);
  const [dose, setDose] = useState([]);
  const [route, setRoute] = useState([]);
  const [requiredDoses, setRequiredDoses] = useState([]);
  const [nextDoseInDays, setNextDoseInDays] = useState([]);
  const [errors, setErrors] = useState([]);
  
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let vaccinationProgram = {
      vaccinator: vaccinator,
      brand: brand,
      product: product, 
      dose: dose, 
      route: route, 
      required_doses: requiredDoses,
      next_dose_in_days: nextDoseInDays, 
    }

    API.post('vaccination_programs/', {vaccinationProgram}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        history.push('/');
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
          New Vaccination Program
        </Typography>    
       <form className={classes.form} onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth autoFocus
            id="vaccinator" name="vaccinator" value={vaccinator} 
            label="Vaccinator" onChange={(event) => {setVaccinator(event.target.value)}} 
          />
          <TextField variant="outlined" margin="normal" required fullWidth 
            id="brand" name="brand" value={brand} 
            label="Vaccine Brand" onChange={(event) => {setBrand(event.target.value)}} 
          />
          <TextField variant="outlined" margin="normal" required fullWidth 
            id="product" name="product" value={product} 
            label="Vaccine Product" onChange={(event) => {setProduct(event.target.value)}} 
          />
          <TextField variant="outlined" margin="normal" required fullWidth 
            id="route" name="route" value={route} 
            label="Route" onChange={(event) => {setRoute(event.target.value)}} 
          />
          <TextField variant="outlined" margin="normal" required fullWidth 
            id="dose" name="dose" value={dose} 
            label="Dose Size (ul)" onChange={(event) => {setDose(event.target.value)}} 
          />
          <TextField variant="outlined" margin="normal" required fullWidth 
            id="requiredDoses" name="requiredDoses" value={requiredDoses} 
            label="Boosts" onChange={(event) => {setRequiredDoses(event.target.value)}} 
          />

          <Typography component="p" className={classes.errors}>
            {CapitalizeFirstLetter(errors.join('.'))}
          </Typography>     
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AddVaccinationProgram;