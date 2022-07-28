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
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!,  password: String!)
        login(email: String!, password: String!): Auth
        saveBook(userId: ID!, savedBooks: [Book] ): User
        deleteBook(userId: ID!, savedBooks: [Book] ): User
    }
`;

module.exports = typeDefs;