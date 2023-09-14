import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import Read from '../read';
import { GET_USERS } from '../../data/queries'
import { MemoryRouter, Routes, Route } from "react-router-dom";
import '@testing-library/jest-dom';
import { MockedProvider } from "@apollo/client/testing";
import Update from '../update';
import { UPDATE_USER } from '../../data/mutation';
import { GET_USER_BY_ID } from '../../data/queries';


test('check Update component', async () => {
  const id = 100;
  const mocks = [
    {
      request: {
        query: UPDATE_USER,
        variables: {id: "100",
          name: "Robert100",
          email: "robert@gmail.com",
        }
      },
      result: {
        "data": {
          "updateUser": {
            "id":id,
            "name": "Robert100",
            "email": "robert@gmail.com",
          }
        }
      }
    },
    {
      request: {
        query: GET_USER_BY_ID,
        variables: {id: "100"}
      },
      result: {
        "data": {
          "user": {
            "id": "100",
            "name": "shubham",
            "email": "shubham@gmail.com",
            "password": "pbkdf2:sha256:600000$C6WnH9tqRmGS07BC$99270d4b7bff8eb22f8aa633fb4d37e036f1f14b80740faf22202639d9623bd9"
          }
        }
      }
    },
    {
        request: {
        query: GET_USERS,
        variables: {}
        },
        result: { "data": {
        "users": [
            {
            "id": "100",
            "name": "Robert100",
            "email": "updated99@gmail.com",
            "password": "pbkdf2:sha256:600000$C6WnH9tqRmGS07BC$99270d4b7bff8eb22f8aa633fb4d37e036f1f14b80740faf22202639d9623bd9"
            }
        ] }
      }
    }
  ];
  
  const update_route = `/update/${id}`;

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[update_route]}>
        <Routes>
          <Route path='/update/:id' Component={Update} />
          <Route path='/read' Component={Read} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );

expect(await screen.findByText("Update User")).toBeInTheDocument();

const inputElement1 = screen.getByPlaceholderText('Name');  ///to test input element Name
fireEvent.change(inputElement1, { target: { value: 'Robert100' } });
expect(inputElement1.value).toBe('Robert100');

const inputElement2 = screen.getByPlaceholderText('Email');    ///to test input element Email
fireEvent.change(inputElement2, { target: { value: 'robert@gmail.com' } });

const createButton = screen.getByText('UPDATE USER');    ///to test Submit button
fireEvent.click(createButton);

expect(await screen.findByText("Submitting...")).toBeInTheDocument();
await new Promise(resolve => setTimeout(resolve, 0));
expect(await screen.findByText("Robert100")).toBeInTheDocument();
});