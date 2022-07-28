import {gql} from '@apollo/client';

export const CREATE_USER = gql `
    mutation createUser($username: String!, $email: String!, $password: String!){
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
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
                savedBooks
            }
        }
    }
`;

export const SAVE_BOOK = gql `
    mutation saveBook($userId: ID!, $book: Book) {
        saveBook(userId: $userId, book: $book) {
            _id
            savedBooks
        }
    }
`;

export const DELETE_BOOK = gql `
    mutation deleteBook($book: Book) {
        deleteBook(book: $book) {
            _id
            savedBooks
        }
    }
`;