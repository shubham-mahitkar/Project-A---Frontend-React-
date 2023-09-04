import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
import TablePagination from '@mui/material/TablePagination';



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


export const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  // { id: 'password', label: 'Password', minWidth: 170 },
]

export default function Read() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let history = useNavigate();

    const [deleteData] = useMutation(DELETE_USER);

    const { loading, error, data, refetch } = useQuery(GET_USERS);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    function Add() {
        history('/create');
    }

    const onDelete = (id) => {
        deleteData({ variables: { id: id } }).then(()=>{
          refetch();
      } );
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

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return (
      <div className="main">
        <h1 title="user list">USER LIST</h1>
        <div>
          <Button type="button" role='button' onClick={() => Add()}>Create User</Button>
        </div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <StyledTableRow>
                    {columns.map((column, index) => (
                      <StyledTableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell>Update</StyledTableCell>
                    <StyledTableCell>DELETE_USER</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {data?.users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <StyledTableRow hover tabIndex={-1} key={index}>
                          {columns.map((column,index) => {
                            const value = row[column.id];
                            return (
                              <StyledTableCell key={index} align={column.align}>
                                { value }
                              </StyledTableCell>
                            );
                          })}
                          
                          <StyledTableCell> 
                            <Link to={`/update/${row.id}`}>
                              <Button>Update</Button>
                            </Link>
                          </StyledTableCell>
                          
                          <StyledTableCell data-testid="tech-form">
                              <Button key={row.id} onClick={() => onDelete(row.id)}>Delete</Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
    )
}
