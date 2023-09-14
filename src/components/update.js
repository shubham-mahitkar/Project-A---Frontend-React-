import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useNavigate  } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './errorboundary';
import { UPDATE_USER } from '../data/mutation';
import { GET_USER_BY_ID } from '../data/queries';


export default function Update() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    let history = useNavigate();
    const { id } = useParams();
  
    const { loading:loading1, error:error1, data:dataByID } = useQuery(GET_USER_BY_ID, {
        variables: { id: id },
      });

    const application = dataByID['user']['application'];
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
    // if (error) return `Submission error! ${error.message}`;
    if (error) return <ErrorBoundary />;


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
                <Form.Field>
                    <label>Applications</label>
                    <input placeholder='Applications' value={application} readOnly />
                </Form.Field>
                <Button type='submit'>UPDATE USER</Button>
            </Form>
        </div>
    )
}