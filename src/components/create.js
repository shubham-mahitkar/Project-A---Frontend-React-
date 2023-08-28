import React, { useState } from 'react';
import { Checkbox, Form } from 'semantic-ui-react'
import axios from "axios";
import { useNavigate  } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


// Define mutation
const CREATE_USER = gql`
mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password:$password) {
      name
      email
      password
    }
  }
`;

export default function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useNavigate();
    const [postData, { loading, error, data }] = useMutation(CREATE_USER);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    if (data) history('/read');

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


    // const postData = () => {
    //     let data = {"name":name,
    //         "email":email,
    //         "pwd":password
    //     };
          
    //     let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'http://localhost:5000/add',
    //     headers: { 
    //         'Content-Type': 'application/json'
    //     },
    //     data : data
    //     };
        
    //     axios.request(config)
    //     .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //     })
    //     .then(() => {
    //         history('/read')
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });
    // }
        

    return (
        <div><header>Create User</header>
            <Form className="create-form" 
                onSubmit={e => {
                    e.preventDefault();
                    postData({ variables: { name: name, email: email, password: password } });
                }}>
                <Form.Field>
                    <label>Name</label>
                    <TextField  placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <TextField  type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <TextField  label="password" type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}