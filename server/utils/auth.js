const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for just the single request made to the graphql endpoint
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers or by the request body, when posting or putting data
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // return res.status(400).json({ message: 'You have no token!' });
      // if there is no token the request is just returned
      return req;
    }

    // verify token is valid and not expired and then adds decoded user data to the req.user key, to be accessed in resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      // return res.status(400).json({ message: 'invalid token!' });
      //if token cannot be verified or if there is an error, request is returned.
      return req;
    }

    // instead of sending to next endpoint, user data is saved to be accessed by the resolver to be used to authenticate user with each request. If the request has valid token unique to the user, then it will be accepted
    // next();
  },
  //signs the token with the user's data that comes in as input to the function and then sets expiration date for the token.
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
