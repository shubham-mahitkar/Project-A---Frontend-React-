import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import Read, { GET_USERS, DELETE_USER } from './read';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { MockedProvider } from "@apollo/client/testing";
import { act } from 'react-dom/test-utils';


/////////test1 - Read Component////////////
test('check Read component', async () => {
    const mocks = [
      {
        request: {
          query: GET_USERS,
          variables: {}
        },
        result: { "data": {
          "users": [
            {
              "id": "999",
              "name": "shubham99",
              "email": "mahitkar99@gmail.com",
              "password": "pbkdf2:sha256:600000$7blUGE7X47wfLhA5$812e9717924855df00688f81d5c8b84b7a1878af7637d523a286c7a1732c7fff"
            }] }
      }}
    ];
    
    render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <BrowserRouter>
                <Read />
            </BrowserRouter>
          </MockedProvider>
        );
  
    expect(await screen.findByText("shubham99")).toBeInTheDocument();
    // expect(await screen.findByButton("Create User")).toBeInTheDocument();
  });



/////////test1 - Delete Component////////////
test('test delete function', async () => {
    const id = 999;
    const mocks = [
      {
        request: {
          query: GET_USERS,
          variables: {}
        },
        result: { "data": {
          "users": [
            {
              "id": id,
              "name": "shubham99",
              "email": "mahitkar99@gmail.com",
              "password": "pbkdf2:sha256:600000$7blUGE7X47wfLhA5$812e9717924855df00688f81d5c8b84b7a1878af7637d523a286c7a1732c7fff"
            }] },
          },
          newData: jest.fn(() => ({
              "data": {
                  "users": [
                    {
                      "id": id,
                      "name": "refetched",
                      "email": "refetched99@gmail.com",
                      "password": "pbkdf2:sha256:600000$7blUGE7X47wfLhA5$812e9717924855df00688f81d5c8b84b7a1878af7637d523a286c7a1732c7fff"
                    }] },
            }))
      },
      {
          request: {
            query: DELETE_USER,
            variables: {id:id}
          },
          result: {
            "data": {
              "deleteUser": true
            }
          }},
    ];
    act(() => {
      render(
          <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
              <Read />
          </BrowserRouter>
          </MockedProvider>
      )});
  
      await waitFor(()=>{expect(screen.getByRole('button',{name:'Delete'})).toBeInTheDocument()});
  
      const deleteButton = screen.getByRole('button', {
          name: /delete/i
        });
  
      act(() => {
        fireEvent.click(deleteButton, { key: id });
      });
    
      expect(await screen.findByText("refetched")).toBeInTheDocument();
    });