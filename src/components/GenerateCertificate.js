import React, { useState, useEffect } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../API';
import QRCode from 'qrcode.react';

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
  qrcontent: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

function GenerateCertificate({ context }) {
  const classes = useStyles();
  const [vaccinee, setVacinee] = useState([]);
  const [errors, setErrors] = useState([]);
  const [program, setProgram] = useState();
  const [verified, setVerified] = useState();
  const [certificate, setCertificate] = useState("");
  
  const queryString = require('query-string');
  const parsed = queryString.parse(context.location.search, {decode:false});

  const handleSubmit = (event) => {
    event.preventDefault();

    let certificate = {
      program_date: parsed.date,
      program_signature: parsed.signature,
      vaccinee: vaccinee,
    }

    API.post('vaccination_programs/'+context.match.params.id + "/certify", { certificate }, {withCredentials: true})
       .then(response =>  setCertificate(response.data.certificate))
  }  
  
  const processReturn = (data) => {
    setVerified(data.verified)
    setProgram(data.vaccinationProgram)
  }

  useEffect(() => {
    //console.log(context.location.search.split("&"))
    API.get('vaccination_programs/'+context.match.params.id + "/verify?" +
            'date=' + parsed.date +
            '&signature=' + parsed.signature, 
           {withCredentials: true})
       .then(response => processReturn(response.data))
  }, []);

  return verified ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/cvs.png">

        </Avatar>
        <Typography component="h1" variant="h5">
          New Vaccine Certificate
        </Typography>    
       <form className={classes.form} onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth 
            id="vaccinee" name="vaccinee" value={vaccinee} 
            label="Your Name" onChange={(event) => {setVacinee(event.target.value)}} 
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
            Generate
          </Button>
        </form>
        { certificate.length >0 ? <QRCode value={certificate} fgColor="#3654DD" size={345} level="H" />: null }
        { certificate.length >0 ? 
          <Typography component="p" variant="body2" className={classes.qrcontent}>
            Content: {certificate}
          </Typography>
          : null }
      </div>
    </Container>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/cvs.png">

        </Avatar>
        <Typography component="h1" variant="h5">
          Invalid Signature.
        </Typography>    
        <Typography component="p">
          Try scanning your code again
        </Typography>    
      </div>
    </Container>
  )
}

export default GenerateCertificate;