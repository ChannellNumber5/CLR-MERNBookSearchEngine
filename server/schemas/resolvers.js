const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId});
        }

    },

    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(User);

            return {token, user}
        },
        login: async (parent, {email, password}) => {
            const user = await user.findOne({ email });

            if ( !user) {
                throw new AuthenticationError('No user found associated with this email address');
            }

            const validPass = await user.isCorrectPassword(password);

            if (!validPass) {
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { userId, bookData }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: userId},
                    {$addToSet: { savedBooks: {book: bookData }}},
                    { new: true, runVAlidators: true }
                );
            }
            throw new AuthenticationError("User not found. You need to be logged in to save books");
        },

        deleteBook: async (parent, { book }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: book } },
                    {new: true}
                );
            }
            throw new AuthenticationError("User not found. You need to log in to deleted book from list.");
        },
    }, 
};

module.exports = resolvers;