const { UserList, MovieList } = require('../Fakedata')
// Imports the fake data for users and movies.
const _ = require("lodash")
// Imports Lodash, a utility library that makes working with arrays/objects easier.
// Why:
// You’ll use functions like _.find, _.filter, and _.remove to search or edit your fake data.


const resolvers = {
    //this will contain all resolver function that exist in our API such as API for getting data from databse.
    Query: {
        // ➡️ This is called a Query resolver (or top-level resolver)


        // Returns all users.
        // No args needed.
        // Just sends back the full list.
        Users(parent, args, context, info) {
            console.log(context)
            if (UserList) {
                return { users: UserList };
            } else {
                { message: "there was an error..." }
            }
            // return UserList;
        },

        // Finds a single user by name.
        // Uses _.find to look in UserList where name matches.
        user(parent, args, context, info) {
            //what is context argument. it is used in authentication/authorization
            const name = args.name;
            const user = _.find(UserList, { name });
            return user;
        },


        // Returns all movies.
        movies() {
            return MovieList;
        },



        // Finds a single movie by name.
        // Uses _.find to look in MovieList where name matches.
        moviespecific(parent, args) {
            const name = args.name;
            const movie = _.find(MovieList, { name });
            return movie;
        }
    },




    //this will enable to only the show the movies which have been released b/w 2000 & 2010
    // ➡️ This is called a Type field resolver (or nested resolver)
    User: {
        //HY USE User: { ... }?
        // Because you're talking about a user. You want to get something that belongs to a specific user — in this case, favouritemovie.
        favouritemovie(parent) {
            return _.filter(MovieList, (movie) => {
                return movie.year >= 2000 && movie.year <= 2005
            })
        }
    },



    //this creates a new field in your database another data in your DB
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input
            console.log(user)
            //for incrementing id by 1
            const lastid = UserList[UserList.length - 1].id
            user.id = lastid + 1;
            UserList.push(user);
            return user;
            //this pushing is an example of JSON format not in mongodb db or any other.

        },
        UpdateName: (parent, args) => {
            const { id, newname } = args.input;
            let userupdate;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.name = newname;
                    userupdate = user
                }
            });
            return userupdate;
        },
        deleteUser: (parent, args) => {
            // You have to understand what is this PARENT argument.
            // in query there is user and in users there is a type favourite_movie
            //query ---> User ----> favourite_movie 
            // if i am in favourite_movie & asking to console.log(parent) so it would print all users data and its each & every field.
            const { id } = args;

            if (!id) throw new Error("Missing ID");

            const removedUsers = _.remove(UserList, (user) => String(user.id) === String(id));
            if (removedUsers.length === 0) {
                throw new Error("User not found");
            }

            return removedUsers[0];
        }
    },

// Helps GraphQL decide which type (success or error) was returned for UserResult.
// Checks which key exists (users or message).

    UserResult: {
        // This is the resolver object for the UserResult union.
        __resolveType(obj) {
            //__resolveType is a special GraphQL function used for union types.
            // It receives the actual object (obj) returned by your resolver.
            // Your job is to look at that object and tell GraphQL which type it is.

            if (obj.users) {
                return "UserSuccessfulResult";
            //If the object has a users field, that means it must be a success result.

            // So we tell GraphQL: "This is the UserSuccessfulResult type."

            }
            if(obj.message){
                return "UsersErrorResult";
                // If the object has a message field (error message), then it’s the error type.


            }
            return null;
            // If it’s neither, return null. This means GraphQL won’t know what to do, and it will throw an error — which is good for debugging if your data is messed up.


        }
    }
}

module.exports = { resolvers }