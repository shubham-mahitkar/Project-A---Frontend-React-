import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate  } from 'react-router';
import { useQuery, gql, useMutation } from '@apollo/client';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
      password
    }
  }
`;


const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;


export default function Read() {
    const [users, setUsers] = useState([])
    let history = useNavigate();
    
    const [deleteData, { loading1, error1, data1 }] = useMutation(DELETE_USER);

    const { loading, error, data } = useQuery(GET_USERS);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    

    // useEffect(()=>{
    //     // let data = '';
    //     // let config = {
    //     // method: 'get',
    //     // maxBodyLength: Infinity,
    //     // url: 'http://localhost:5000/users',
    //     // headers: { },
    //     // data : data
    //     // };

    //     // axios.request(config)
    //     // .then((response) => {
    //     //     setUsers(response.data)
    //     //     console.log(response.data);
    //     // })
    //     // .catch((error) => {
    //     //     console.log(error);
    //     // });
    // } , [data])


    const setData = (data) => {
        // let { id, name, email, password } = data;
        localStorage.setItem('ID', data.id);
        localStorage.setItem('Name', data.name);
        localStorage.setItem('Email', data.email);
        localStorage.setItem('Password', data.password);
    }


    const getData = () => {
        axios.get(`http://localhost:5000/users`)
            .then((getData) => {
                 setUsers(getData.data);
             })
    }

    function Add() {
        history('/create');
    }

    const onDelete = (id) => {
        deleteData({ variables: { id: id } });
        history('/read');

        // let data = '';

        // let config = {
        // method: 'delete',
        // maxBodyLength: Infinity,
        // url: 'http://localhost:5000/delete/'+ id,
        // headers: { },
        // data : data
        // };

        // axios.request(config)
        // .then((response) => {
        // console.log(JSON.stringify(response.data));
        // })
        // .then(() => {
        //     getData();
        // })
        // .catch((error) => {
        // console.log(error);
        // });
    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    return (
        <div className="main">
            <div style={{padding: 50}}><Button onClick={() => Add()}>Create User</Button></div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Password</StyledTableCell>
                        <StyledTableCell>Update</StyledTableCell>
                        <StyledTableCell>Delete</StyledTableCell>
                    </StyledTableRow>
                </TableHead>

                <TableBody>
                    {data?.users.map((data) => {
                        return (
                            <StyledTableRow  key={data}>
                                <StyledTableCell>{data.name}</StyledTableCell>
                                <StyledTableCell>{data.email}</StyledTableCell>
                                <StyledTableCell>{data.password}</StyledTableCell>
                                <Link to='/update'>
                                    <StyledTableCell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </StyledTableCell>
                                </Link>
                                <StyledTableCell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}
