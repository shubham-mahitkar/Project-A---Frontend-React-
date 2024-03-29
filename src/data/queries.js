import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
      password
      application
    }
  }
`;


export const GET_USER_BY_ID = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
      password
      application
      followers
      labels
      awards {
      album_song
      award
      year
    }
    }
  }
`;