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
import Loading from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

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
    marginTop: theme.spacing(1),
  },
  errors: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: '#F00',
    textAlign: 'center'
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  certificte: {
    marginTop: theme.spacing(3),
  },
}));

function GenerateCertificate({ context }) {
  const classes = useStyles();
  const [vaccinee, setVacinee] = useState([]);
  const [errors, setErrors] = useState([]);
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
       .then(response => setCertificate(response.data.certificate))
       .catch(error => setErrors(error.response.data.errors));
  }  
  
  const processReturn = (data) => {
    setVerified(data.verified)
  }

  useEffect(() => {
    API.get('vaccination_programs/'+context.match.params.id + "/verify?" +
            'date=' + parsed.date +
            '&signature=' + parsed.signature, 
           {withCredentials: true})
       .then(response => processReturn(response.data))
       .catch(error => setErrors(error.response.data.errors));
  }, [context.match.params.id, parsed.date, parsed.signature]);

  return verified ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/cvs.png">

        </Avatar>
        <Typography component="h1" variant="h5">
          New Vaccine Certificate
        </Typography>
        { certificate.length === 0 ?    
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField variant="outlined" margin="normal" required fullWidth 
              id="vaccinee" name="vaccinee" value={vaccinee} 
              label="Your Name" onChange={(event) => {setVacinee(event.target.value)}} 
            />

            <Typography component="p" className={classes.errors}>
              {errors.join('.')}
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
          :
          <div className={classes.certificte}>
            <QRCode value={certificate} fgColor="#3654DD" size={345} level="H" />
            <Text>{certificate}</Text>
          </div>
          }
      </div>
    </Container>
  ) : errors.any ? (
    <ErrorScreen title={"Invalid Vaccination Program"} errors={errors} />
  ) : (
    <Loading />
  )
}

export default GenerateCertificate;