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
import QRCode from 'qrcode.react';

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

  // TODO: Export this into a lib
  const calculateQR = (vac_prog) => {
    const UI_URL = process.env.NODE_ENV === 'production' ? 
           'https://healthpassport.vitorpamplona.com'
           : 'http://localhost:3001'
    
    return UI_URL + process.env.PUBLIC_URL +  "/generateCertificate/" +vac_prog.id
          + "?date=" + new Date().toJSON() 
          + "&signature=" + vac_prog.signature;
  }

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
            <TableCell>Signature</TableCell>
            <TableCell>Code</TableCell>
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
              <TableCell>{row.signature}</TableCell>
              <TableCell>
                <Link href={"/printVaccination/" + row.id}>
                  <QRCode value={calculateQR(row)} 
                                 fgColor="#3654DD" size={150} level="H" />
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