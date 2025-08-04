const { gql } = require("apollo-server")

// gql is used to write GraphQL code inside JavaScript.
//this is where u define your types,queries,mutattions,subscription etc

// very first schema starts with type Query and this fiedls all the queries we will be making.

// Starts defining your GraphQL schema as a string using backticks (`).
const typeDefs = gql`
    type User{
        name:String!
        id:ID!
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
        movies:[movie!]! #returns all movies
        # Users:[User!]! #inorder to get all users we put [ ] or else we will get only 1 user ------- returns a list of all users
        Users: UserResult! #Users uses a UserResult union (can be success or error).
        moviespecific(name:String):movie! #lets you search for one movie by name
        user(name:String):User! #gets one user by name



        #as i added a field in the type query so i need to add a new resolver for it.
    }   #now a resolver will resolve the Users



    #we will specify which fields to create a user ----- Defines an input type for creating a new user.
    input CreateUserInput{
        name:String!
        age:Int = 18 #Default value: if age is not provided, it becomes 18
        nationality:String!
    }

    #Defines the structure for updating a user’s name.
    input UpdateNameInput{
        id:ID!
        newname:String!
    }



    #Defines all the "write" operations (create, update, delete).
    type Mutation{
        createUser(input:CreateUserInput!):User #createUser: adds a new user using input object
        UpdateName(input:UpdateNameInput):User #UpdateName: changes a user’s name
        deleteUser(id:ID!):User #deleteUser: removes user by id

        #if there are many arguments so use called an INPUT
    }



# Creates a custom type called nationality that can only be one of these 3 values.
# 🧠 Why:
# Useful for validations and autocomplete in GraphQL clients.
# Ensures users don’t send random strings like "Mars" or "123" for nationality.
    enum nationality { #enumeration — basically, a list of predefined constant values. It’s like saying: “Only these specific values are allowed for this field. Nothing else.”
        Canada
        Brazil
        United States
    }

# These handle success or error responses for Users query.
# union allows you to return either a success object or an error message.

    type UserSuccessfulResult{
        users: [User!]!
        # User! → Each user inside the list must not be null.
        # [User!] → A list of non-null users.
        # [User!]! → The list itself must also not be null.

    }

    type UsersErrorResult{
        message:String!
    }

    union UserResult= UserSuccessfulResult | UsersErrorResult 

`
module.exports = { typeDefs }