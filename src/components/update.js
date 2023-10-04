import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useNavigate  } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './errorboundary';
import { UPDATE_USER } from '../data/mutation';
import { GET_USER_BY_ID } from '../data/queries';
// import { MultiSelect } from "react-multi-select-component";


export default function Update() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [application, setApplication] = useState([]);
    const [followers, setFollowers] = useState('');
    const [labels, setLabels] = useState('');
    let history = useNavigate();
    const { id } = useParams();
    const { loading:loading1, error:error1, data:dataByID } = useQuery(GET_USER_BY_ID, {
        variables: { id: id },
    });

    // const application = dataByID?.user.application || ["not registered"];
     

    useEffect(()=> {
        if(dataByID){
            setName(dataByID?.user.name);
            setEmail(dataByID?.user.email);
            setApplication(dataByID?.user.application || ["not registered"]);
            setFollowers(dataByID?.user.followers);
            setLabels(dataByID?.user.labels);
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

    const applications = [
        { value: 'Facebook', label: 'Facebook' },
        { value: 'Instagram', label: 'Instagram' },
        { value: 'Twitter', label: 'Twitter' },
        { value: 'Pinterest', label: 'Pinterest' },
        { value: 'Youtube', label: 'Youtube' },
        { value: 'Tiktok', label: 'Tiktok' },
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
                    updateRecord({ variables: {id: id, name: name, email: email, application: application } }); 
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
                <label>Application</label>
                <select value={application} aria-label="Application" id="application" name="application" multiple onChange={handleSelectChange}>
                        {applications.map((option) => (
                                <option key={option.value} selected={true?option.value===application:false} multiple>
                                    {option.value}
                                </option>
                        ))}
                </select>
                <Form.Field>
                    <label>Followers</label>
                    <input placeholder='Followers' value={followers}/>
                </Form.Field>
                <Form.Field>
                    <label>Labels</label>
                    <input placeholder='Labels' value={labels}/>
                </Form.Field>
                <Button type='submit'>UPDATE USER</Button>
            </Form>
        </div>
    )
}