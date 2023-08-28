import React from 'react';
import { render, screen } from '@testing-library/react';
import Read, { GET_USERS } from './read';
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from "@apollo/client/testing";


// const GET_USERS = gql`
//   query users {
//     users {
//       id
//       name
//       email
//       password
//     }
//   }
// `;

test('renders component Read', () => {
  const sample_data = {id: 1, name: "shubham", email:"mahitkar" };
  const mocks = [
    {
      request: {
        query: GET_USERS,
        // variables: {id: 1, name: "shubham", email:"mahitkar" }
      },
      result: { data: {users: sample_data} }
    }
  ];
  console.log("mocks: ", mocks[0].request.query);
  
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <Read /> 
      </BrowserRouter>
    </MockedProvider>
  );
  const textElement = screen.getByText('shubham');
  expect(textElement).toBeInTheDocument();
  expect(mocks).toMatchObject({
    name: 'shubham',
    email: 'mahitkar',
  });
});



// it("should render user table", async () => {
//   const userMock = {
//     request: {
//       query: GET_USERS,
//       variables: { name: "shubham" }
//     },
//     result: {
//       data: { users: { id: 1, name: "shubham", email: "mahitkar" } }
//     }
//   };
//   render(
//     <MockedProvider mocks={[userMock]} addTypename={false}>
//       <BrowserRouter>
//          <Read /> 
//       </BrowserRouter>
//      </MockedProvider>
//   );
//   expect(await screen.findByText("shubham")).toBeInTheDocument();
//   expect(await screen.findByText("Create User")).toBeInTheDocument();
// });

