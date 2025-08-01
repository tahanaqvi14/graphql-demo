const { typeDefs } = require('./schema/types-def');
const { resolvers } = require('./schema/resolvers');
const { ApolloServer } = require('apollo-server');

// Make a new instance of Apollo Server 
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => {
    console.log(`Your api is running ${url}`);
});