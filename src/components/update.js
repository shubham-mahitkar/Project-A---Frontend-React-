import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useNavigate  } from 'react-router';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';


// Define mutation
export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $name: String!, $email: String!) {
  updateUser(id: $id, name: $name, email: $email) {
    id
    name
    email
  }
}
`;

export const GET_USER_BY_ID = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
      password
    }
  }
`;


export default function Update() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    let history = useNavigate();
    const { id } = useParams();
  
    const { loading:loading1, error:error1, data:dataByID } = useQuery(GET_USER_BY_ID, {
        variables: { id: id },
      });

    useEffect(()=> {
        if(dataByID){
            setName(dataByID?.user.name);
            setEmail(dataByID?.user.email);
        }
    }, [dataByID]);

    const [updateRecord, { data, loading, error }] = useMutation(UPDATE_USER);

    useEffect(()=>{
      if (data) {
          history('/read');
      }
      }, [data]);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return (
        <div>
            <Form className="create-form" 
                onSubmit={e => {
                    e.preventDefault();
                    updateRecord({ variables: {id: id, name: name, email: email } }); 
                }}>
                <h1 style={{color: "white"}}> Update User </h1>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Field>
                <Button type='submit'>UPDATE USER</Button>
            </Form>
        </div>
    )
}