const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        # me: User, not sure if we'll use this yet...
    }

    type Mutation {
        createUser()
        login()
        saveBook()
        deleteBook()
    }
`;