const { gql } = require("apollo-server")

//here u can write pure graphql code
//this is where u define your types,queries,mutattions,subscription etc

// very first schema starts with type Query and this fiedls all the queries we will be making.
const typeDefs = gql`
    type User{
        name:String!
        # id:ID!
        age:Int!
        nationality:String! 
        friends:[User]
        favouritemovie:[movie!]
    }

    type movie{
        id:ID!
        name:String!
        inTheaters:Boolean!
        year:Int!
    }

#to have data about users we have to create a type called User
    type Query{
        movies:[movie!]!
        moviespecific(name:String):movie!
        Users:[User!]! #inorder to get all users we put [ ] or else we will get only 1 user
        user(name:String):User!
        #as i added a field in the type query so i need to add a new resolver for it.
    }   #now a resolver will resolve the Users

    #we will specify which fields to create a user,
    input CreateUserInput{
        name:String!
        age:Int = 18 #if age is not passed so 18 is passed.
        nationality:String!
    }
    #write fields that are needed to be mutated/updated
    type Mutation{
        createUser(input:CreateUserInput!):User! 
        #if there are many arguments so use called an INPUT
    }

    enum nationality {
        Canada
        Brazil
        United States
    }

`
module.exports = { typeDefs }