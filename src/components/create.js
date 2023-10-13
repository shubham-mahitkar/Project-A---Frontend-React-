import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import ErrorBoundary from './errorboundary';
import { CREATE_USER } from '../data/mutation';
import { GET_USERS } from '../data/queries';

const applications = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Pinterest', label: 'Pinterest' },
  { value: 'Youtube', label: 'Youtube' },
  { value: 'Tiktok', label: 'Tiktok' },
  { value: 'Spotify', label: 'Spotify' },
];

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [application, setApplication] = useState([]);
  const history = useNavigate();

  const [postData, { loading, error, data }] = useMutation(CREATE_USER);
  const { loading: loading1, error: error1, error: data1, refetch } = useQuery(GET_USERS);

  useEffect(() => {
    if (data) {
      history('/read');
    }
  }, [data]);

  if (error) return <ErrorBoundary />;

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  
  const renderInputField = (label, type, value, setter, required = true) => (
    <Form.Field key={label}>
      <label>{label}</label>
      <input type={type} placeholder={label} value={value} onChange={handleInputChange(setter)} required={required} />
    </Form.Field>
  );

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setApplication(selectedOptions);
  };

  return (
    <div>
      <Form
        className="create-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (application.length===0){
            setMessage("please select application")
          } else {
            postData({ variables: { name, email, password, application } }).then(() => {
              refetch();
            });
          }
        }}
      >
        <h1 style={{ color: 'white' }}> Create User </h1>
        {renderInputField('Name', 'text', name, setName)}
        {renderInputField('Email', 'email', email, setEmail)}
        {renderInputField('Password', 'password', password, setPassword)}
        <label>Application</label>
        <select value={application} required aria-label="Application" id="application" name="application" multiple onChange={handleSelectChange}>
          {applications.map((option) => (
            <option key={option.value}>{option.value}</option>
          ))}
        </select><p>{message?message:null}</p>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Create;
