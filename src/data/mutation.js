import { gql } from '@apollo/client';

// Define mutation
export const CREATE_USER = gql`
mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password:$password) {
      name
      email
      password
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $name: String!, $email: String!) {
  updateUser(id: $id, name: $name, email: $email) {
    id
    name
    email
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;