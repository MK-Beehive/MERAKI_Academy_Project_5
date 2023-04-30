import  React ,{useState ,useEffect} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import {AiFillWechat} from "react-icons/ai"
import {MdDeleteForever} from "react-icons/md"
import {SiGmail} from "react-icons/si"
import "./styleadmin.css"

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
    const [users, setusers] = useState([]);


    const allUsers = () => {
        axios
          .get(`http://localhost:5000/users/`)
          .then((users) => {
            console.log("!!!!!!!!!!!!!!!!!!!!!", users);
    
         
    
            setusers(users.data);
           
          })
          .catch((err) => {
            console.log("error", err);
          });
      };
    
      useEffect(() => {
        allUsers();
      }, []);
    




  return (
    <React.Fragment>
      <Title>Manage Users</Title>
     

      <Table size="small">
        <TableHead>
          <TableRow>

            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Job Title </TableCell>
            <TableCell>Majority </TableCell>
            <TableCell >Role</TableCell>
            <TableCell align='right'>Chat</TableCell>
            <TableCell align='right'>Mail</TableCell>           
            <TableCell align='right'>Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
                 <TableRow key={row.id}>
              <TableCell>{row.firstname}{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.jobtitle}</TableCell>
              <TableCell>{row.majorityname}</TableCell>
              <TableCell >{row.role}</TableCell>
             <TableCell align='right' ><AiFillWechat className='contact' /></TableCell>
              <TableCell align='right' ><SiGmail  className='contact'/> </TableCell>
              <TableCell align='right' ><MdDeleteForever className='contact' /></TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Users
      </Link>
    </React.Fragment>
  );
}
