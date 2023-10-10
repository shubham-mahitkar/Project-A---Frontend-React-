import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react'
import { useNavigate  } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import ErrorBoundary from './errorboundary';
import { CREATE_USER } from '../data/mutation';
import { GET_USERS } from '../data/queries';

export default function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [application, setApplication] = useState([]);
    let history = useNavigate();
    const [postData, { loading, error, data }] = useMutation(CREATE_USER);
    const { loading:loading1, error:error1, error:data1, refetch } = useQuery(GET_USERS);

    useEffect(()=>{
        if (data) {
            history('/read');
        }
        }, [data]);

    if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;
    if (error) return <ErrorBoundary />;


    const applications = [
        { value: 'Facebook', label: 'Facebook' },
        { value: 'Instagram', label: 'Instagram' },
        { value: 'Twitter', label: 'Twitter' },
        { value: 'Pinterest', label: 'Pinterest' },
        { value: 'Youtube', label: 'Youtube' },
        { value: 'Tiktok', label: 'Tiktok' },
        { value: 'Spotify', label: 'Spotify' },
      ];

      const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        setApplication(selectedOptions);
      };

    return (
        <div>
            <Form className="create-form" 
                onSubmit={e => {
                    e.preventDefault();
                    postData({ variables: { name: name, email: email, password: password, application: application } }).then(()=>{
                        refetch();
                    } );
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
                <label>Application</label>
                <select value={application} aria-label="Application" id="application" name="application" multiple onChange={handleSelectChange}>
                        {applications.map((option) => (
                                <option key={option.value} multiple>
                                    {option.value}
                                </option>
                        ))}
                </select>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}