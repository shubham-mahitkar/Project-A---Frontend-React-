import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import Read, { GET_USERS } from './read';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import '@testing-library/jest-dom';
import { MockedProvider } from "@apollo/client/testing";
import { act } from 'react-dom/test-utils';
import Create, { CREATE_USER } from './create';


test('check Create component manually', async () => {
  const mocks = [
    {
      request: {
        query: CREATE_USER,
        variables: {name: "Hellotest", email: "Hellotest@gmail.com", password:"Hellotest@#"}
      },
      result: {"data": {
        "createUser": {
          "name": "Hellotest",
          "email": "Hellotest@gmail.com",
          "password": "Hellotest@#"
        }
      }}
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
            "name": "Hellotest",
            "email": "Hellotest@gmail.com",
            "password": "Hellotest@#"
            }
            ] }
        },
    }
  ];
  const update_route = `/create`;
  render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[update_route]}>
            <Routes>
              <Route path='/read' Component={Read} />
              <Route path='/create' Component={Create} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

  expect(await screen.findByText("Create User")).toBeInTheDocument();
  const inputElement1 = screen.getByPlaceholderText('Name');  ///to test input element Name
  act(() => {
    fireEvent.change(inputElement1, { target: { value: 'Hellotest' } });
  });
  expect(inputElement1.value).toBe('Hellotest');

  const inputElement2 = screen.getByPlaceholderText('Email');    ///to test input element Email
  act(() => {
  fireEvent.change(inputElement2, { target: { value: 'Hellotest@gmail.com' } });
  });

  const inputElement3 = screen.getByPlaceholderText('Password');     ///to test input element Password
  act(() => {
  fireEvent.change(inputElement3, { target: { value: 'Hellotest@#' } });
  });

  const createButton = screen.getByText('Submit');    ///to test Submit button
  act(() => {
  fireEvent.click(createButton);
});

  expect(await screen.findByText("Submitting...")).toBeInTheDocument();
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(await screen.findByText("USER LIST")).toBeInTheDocument();
  expect(await screen.findByText("Hellotest@gmail.com")).toBeInTheDocument();
});
