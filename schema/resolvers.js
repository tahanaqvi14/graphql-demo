const { UserList, MovieList } = require('../Fakedata')
const _ = require("lodash")

const resolvers = {
    //thhis will contain all resolver function that exist in our API such as API for getting data from databse.
    Query: {
        // ➡️ This is called a Query resolver (or top-level resolver)

        Users() {
            return UserList;
        },
        user(parent, args) {
            const name = args.name;
            const user = _.find(UserList, { name });
            return user;
        },
        movies() {
            return MovieList;
        },
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
    Mutation:{
        createUser:(parent, args)=>{
            const user=args.input
            console.log(user)
        }
    }

}

module.exports = { resolvers }