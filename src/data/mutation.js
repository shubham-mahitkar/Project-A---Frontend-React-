import { gql } from '@apollo/client';

// Define mutation
export const CREATE_USER = gql`
mutation createUser($name: String!, $email: String!, $password: String!, $application: [String]) {
    createUser(name: $name, email: $email, password:$password, application: $application) {
      name
      email
      password
      application
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $name: String!, $email: String!, $application: [String]) {
  updateUser(id: $id, name: $name, email: $email, application: $application) {
    id
    name
    email
    application
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;