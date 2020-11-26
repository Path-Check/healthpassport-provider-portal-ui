import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import API from '../API';
import QRCode from 'qrcode.react';
import Link from '@material-ui/core/Link';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';



const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100vh'
  },
  descrip: {
    paddingLeft:15
  },
  qrcontent: {
    overflow:'break-word',
    whiteSpace: 'unset',
    wordBreak: 'break-all'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PrintVaccinationProgram({ context }) {
  const size = useWindowSize();
  const classes = useStyles(size);
  const [expanded, setExpanded] = React.useState(false);
  const [program, setProgram] = useState([]);
  const [url, setURL] = useState([]);
  const [errors, setErrors] = useState(null);
  const [ready, setReady] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const processReturn = (data) => {
    setProgram(data.vaccinationProgram);
    setURL(data.signedPublicURL);
  }

  useEffect(() => {
    API.get('vaccination_programs/'+context.match.params.id, {withCredentials: true})
       .then(response => {
         setReady(true);
         if (response.status === 200)
           processReturn(response.data);
         else
           setErrors(response.data.errors);
       })
       .catch(error => setErrors(error.response.data.errors));
  }, [context.match.params.id]);

  return ready && url ? (
    <Container component="main" className={classes.container}>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src="/cvs.png"/>
        }
        title={program.vaccinator}
        subheader={<Moment format="MMMM DD, YYYY">{program.created_at}</Moment>}
      />
      <QRCode value={url} fgColor="#3654DD" size={Math.min(size.height-250, size.width-32)} level="L" /> 
      <CardActions disableSpacing className={classes.descrip}>
        <Typography variant="body2" color="textSecondary" component="p">
          Scan the code above to create your own Vaccine Certificate
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{"maxWidth" : Math.min(size.height-290, size.width-32)}}>
          <Typography variant="body2" paragraph className={classes.qrcontent}>
            Content: <Link href={url}>{url}</Link>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Container>
  ) : errors ? (
    <ErrorScreen title={"Invalid Vaccination Program"} errors={errors} />
  ) : (
    <LoadingScreen />
  )
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}