import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from "axios";
import { useNavigate  } from 'react-router';
import { useMutation, gql } from '@apollo/client';



// Define mutation
const UPDATE_USER = gql`
mutation updateUser($id: ID!, $name: String!, $email: String!, $password: String!) {
  updateUser(id: $id, name: $name, email: $email, password:$password) {
    id
    name
    email
    password
  }
}
`;


export default function Update() {
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useNavigate();

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('Name'));
        setEmail(localStorage.getItem('Email'));
        setPassword(localStorage.getItem('Password'));
    }, []);

    const [updateRecord, { data, loading, error }] = useMutation(UPDATE_USER);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    if (data) history('/read');


    // const updateRecord = () => {
    //     let data = {
    //         "id": id,
    //         "name":name,
    //         "email":email,
    //         "pwd":password
    //     };
    //     console.log("data: ", data);
          
    //       let config = {
    //         method: 'put',
    //         maxBodyLength: Infinity,
    //         url: 'http://localhost:5000/update',
    //         headers: { 
    //           'Content-Type': 'application/json'
    //         },
    //         data : data
    //       };
          
    //       axios.request(config)
    //       .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //       })
    //       .then(() => {
    //         history('/read')
    //     })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    // }

    return (
        <div>
            <Form className="create-form" 
                onSubmit={e => {
                    e.preventDefault();
                    updateRecord({ variables: {id: id, name: name, email: email, password:password } });
                    // name = "name";
                }}>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input label="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Field>
                <Button type='submit'>Update</Button>
            </Form>
        </div>
    )
}
