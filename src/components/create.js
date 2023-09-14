import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react'
import { useNavigate  } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import Button from '@mui/material/Button';
import ErrorBoundary from './errorboundary';
import { CREATE_USER } from '../data/mutation';

export default function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useNavigate();
    const [postData, { loading, error, data }] = useMutation(CREATE_USER);

    useEffect(()=>{
        if (data) {
            history('/read');
        }
        }, [data]);

    if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;
    if (error) return <ErrorBoundary />;
     

    return (
        <div>
            <Form className="create-form" 
                onSubmit={e => {
                    e.preventDefault();
                    postData({ variables: { name: name, email: email, password: password } });
                }}>
                    <h1 style={{color: "white"}}> Create User </h1>
                <Form.Field>
                    <label>Name</label>
                    <input  placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input  type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input  label="password" type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}