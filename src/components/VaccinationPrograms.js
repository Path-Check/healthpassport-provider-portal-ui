import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import API from '../API';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function VaccinationPrograms() {
  const classes = useStyles();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    API.get('vaccination_programs/', {withCredentials: true})
       .then(response => setPrograms(response.data.vaccinationPrograms))
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Vaccination Programs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Vaccinator</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Route</TableCell>
            <TableCell>Dose (ml)</TableCell>
            <TableCell>N. of Doses</TableCell>
            <TableCell>Next Dose in (days)</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programs.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.vaccinator}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.route}</TableCell>
              <TableCell>{row.dose}</TableCell>
              <TableCell>{row.required_doses}</TableCell>
              <TableCell>{row.next_dose_in_days}</TableCell>
              
              <TableCell>
                <Link href={"/printVaccination/" + row.id}>Show Code
                </Link>
              </TableCell>
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