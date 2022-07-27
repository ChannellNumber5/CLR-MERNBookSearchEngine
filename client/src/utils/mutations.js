import {gql} from '@apollo/client';

export const CREATE_USER = gql `
    mutation createUser($username: String!, $email: String!, $password: String!){
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String! ) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const SAVE_BOOK = gql `
    mutation saveBook($profileId: ID!, $book: Book) {
        saveBook(profileId: $profileId, book: $book) {
            _id
            name
            savedBooks
        }
    }
`;

export const DELETE_BOOK = gql `
    mutation deleteBook($book: Book) {
        deleteBook(book: $book) {
            _id
            name
            savedBooks
        }
    }
`;