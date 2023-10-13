import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './errorboundary';
import { UPDATE_USER } from '../data/mutation';
import { GET_USER_BY_ID } from '../data/queries';

const applications = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Pinterest', label: 'Pinterest' },
    { value: 'Youtube', label: 'Youtube' },
    { value: 'Tiktok', label: 'Tiktok' },
    { value: 'Spotify', label: 'Spotify' },
];

const Update = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [application, setApplication] = useState([]);
    const [followers, setFollowers] = useState('');
    const [labels, setLabels] = useState('');
    const history = useNavigate();
    const { id } = useParams();

    const { loading: loading1, error: error1, data: dataByID } = useQuery(GET_USER_BY_ID, {
        variables: { id: id },
    });

    useEffect(() => {
        if (dataByID) {
            const { name, email, application, followers, labels } = dataByID.user;
            setName(name);
            setEmail(email);
            setApplication(application);
            setFollowers(followers);
            setLabels(labels);
        }
    }, [dataByID]);

    const [updateRecord, { data, loading, error }] = useMutation(UPDATE_USER);

    useEffect(() => {
        if (data) {
            history('/read');
        }
    }, [data]);

    if (error) return <ErrorBoundary />;

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const renderInputField = (label, type, value, setter, required = true, disabled = false) => (
        <Form.Field key={label}>
            <label>{label}</label>
            <input type={type} placeholder={label} style={{ color: disabled ? 'whitesmoke' : '' }} value={value} onChange={handleInputChange(setter)} required={required} disabled={disabled} />
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
                    updateRecord({ variables: { id, name, email, application } });
                }}
            >
                <h1 style={{ color: 'white' }}> Update User </h1>
                {renderInputField('Name', 'text', name, setName)}
                {renderInputField('Email', 'email', email, setEmail)}
                <label>Application</label>
                <select value={application} required aria-label="Application" id="application" name="application" multiple onChange={handleSelectChange}>
                    {applications.map((option) => (
                        <option key={option.value} selected={application.includes(option.value)}>
                            {option.value}
                        </option>
                    ))}
                </select>
                {renderInputField('Followers', 'text', followers, setFollowers, false, true)}
                {renderInputField('Labels', 'text', labels, setLabels, false, true)}
                <Button type="submit">UPDATE USER</Button>
            </Form>
        </div>
    );
};

export default Update;
