const { typeDefs } = require('./schema/types-def');
// typeDefs defines your GraphQL schema.
// It tells Apollo what types exist (like User, Post) and what queries/mutations are allowed.
// Think of it like your API contract.

const { resolvers } = require('./schema/resolvers');
// resolvers are the functions that run when someone uses your API.
// They connect your GraphQL schema to real data (like from a database, file, or hardcoded).

const { ApolloServer } = require('apollo-server');
// This class lets you create and run a GraphQL API server.
// It's the main engine that understands your schema and handles incoming requests.

// Apollo Server is a tool that helps you build a GraphQL API.
// Because Apollo Server:
// 1)Makes it easy to create your GraphQL backend
// 2)Handles queries, mutations, errors etc. smoothly
// 3)Works well with tools like React, Angular, Vue
// 4)Has nice dev tools to test and debug your API


// Make a new instance of Apollo Server 
const server = new ApolloServer({ typeDefs, resolvers });
// This line connects your GraphQL structure (typeDefs) with the logic (resolvers).
// Tells Apollo: “Use this schema and these functions to respond to API requests.”

server.listen().then(({url}) => {
    console.log(`Your api is running ${url}`);
});