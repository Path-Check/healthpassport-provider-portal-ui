import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, location, product, vaccinee) {
  return { id, date, name, location, product, vaccinee};
}

const rows = [
  createData(0, '19 Nov, 2020', 'CVS Minute Clinic', 'Cambridge, MA', 'Moderna Vaccine', 'Vinay Gidwaney'),
  createData(1, '18 Nov, 2020', 'CVS Minute Clinic', 'Cambridge, MA', 'Moderna Vaccine', '...Certificate Not Taken...'),
  createData(2, '17 Nov, 2020', 'CVS Minute Clinic', 'Cambridge, MA', 'Moderna Vaccine', 'Sam Zimmermann'),
  createData(3, '16 Nov, 2020', 'CVS Minute Clinic', 'Cambridge, MA', 'Moderna Vaccine', 'Ramesh Raskar'),
  createData(4, '15 Nov, 2020', 'CVS Minute Clinic', 'Cambridge, MA', 'Moderna Vaccine', 'Vitor Pamplona'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Programs() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Vaccinations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Vaccinnee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.vaccinee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more vaccinations
        </Link>
      </div>
    </React.Fragment>
  );
}