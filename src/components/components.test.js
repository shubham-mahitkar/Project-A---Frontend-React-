import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import Read, { GET_USERS } from './read';
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import Create from './create';
import App from './../App'



//////////test1////////////

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




//////////test2////////////
test('input changes value on typing', () => {
  
  render(
  <MockedProvider mocks={[]} addTypename={false}>
    <BrowserRouter>
      <Create />
    </BrowserRouter>
  </MockedProvider>);
  const inputElement = screen.getByPlaceholderText('Name');

  fireEvent.change(inputElement, { target: { value: 'Name1' } });

  expect(inputElement.value).toBe('Name1');
});


//////////test3////////////
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <BrowserRouter>
          <Create />
        </BrowserRouter>
      </MockedProvider>, container);
  });
  expect(container.textContent).toBe("Create");
});
