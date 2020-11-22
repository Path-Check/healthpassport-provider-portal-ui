import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import API from '../API';
import QRCode from 'qrcode.react';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100vh'
  },
  root: {
    maxWidth: 345,
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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [program, setProgram] = useState([]);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    API.get('vaccination_programs/'+context.match.params.id, {withCredentials: true})
       .then(response => setProgram(response.data.vaccinationProgram))
  }, []);

  const calculateQR = (vac_prog) => {
    return "http://localhost:3001/generateCertificate/" +context.match.params.id
          + "?date=" + new Date().toJSON() 
          + "&signature=" + vac_prog.signature;
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src="/cvs.png"/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={program.vaccinator}
        subheader={<Moment format="MMMM DD, YYYY">{program.created_at}</Moment>}
      />
      <QRCode value={calculateQR(program)} fgColor="#3654DD" size="345" level="H" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Scan the code below to create your own Vaccine Certificate
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

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
        <CardContent>
          <Typography variant="body2" paragraph>Content: <Link href={calculateQR(program)}>{calculateQR(program)}</Link></Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Container>
  );
}