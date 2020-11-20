import React, {useState, useEffect} from 'react';
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

export default function VaccinationPrograms() {
  const classes = useStyles();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/vaccination_programs/')
      .then(response => response.json())
      .then(data => setPrograms(data.vaccinationPrograms));
    console.log("useEffect Called");
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Vaccinations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Vaccinator</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Dose</TableCell>
            <TableCell>Route</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programs.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.vaccinator}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.dose}</TableCell>
              <TableCell>{row.route}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="/vaccination_programs/add" >
          Add New Program
        </Link>
      </div>
    </React.Fragment>
  );
}